import amqp from "amqplib";

let connection: any | null = null;
let channel: any | null = null;

const RABBIT_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq";
const QUEUE = process.env.RABBITMQ_QUEUE || "orders";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function connectRabbit(options?: {
  retries?: number;
  baseDelayMs?: number;
}) {
  const retries = options?.retries ?? 20;
  const baseDelayMs = options?.baseDelayMs ?? 500;

  let lastErr: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (channel) return;

      connection = await amqp.connect(RABBIT_URL);

      connection.on("error", (err: any) => {
        console.error("[rabbitmq] connection error:", err);
      });

      connection.on("close", () => {
        console.error("[rabbitmq] connection closed");
        connection = null;
        channel = null;
      });

      channel = await connection.createChannel();
      await channel.assertQueue(QUEUE, { durable: true });

      console.log(`[rabbitmq] connected: ${RABBIT_URL}, queue=${QUEUE}`);
      return;
    } catch (err) {
      lastErr = err;

      const delay = Math.min(baseDelayMs * Math.pow(2, attempt - 1), 5000);

      console.error(
        `[rabbitmq] connect failed (attempt ${attempt}/${retries}). Retrying in ${delay}ms...`,
        err,
      );

      try {
        await channel?.close();
      } catch {}
      try {
        await connection?.close();
      } catch {}

      channel = null;
      connection = null;

      await sleep(delay);
    }
  }

  throw lastErr ?? new Error("RabbitMQ connect failed: unknown error");
}

export function getChannel() {
  if (!channel) {
    throw new Error("RabbitMQ not ready. Call connectRabbit() first.");
  }
  return channel;
}

export function publishOrderCreated(data: any) {
  const ch = getChannel();

  ch.sendToQueue(QUEUE, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
}

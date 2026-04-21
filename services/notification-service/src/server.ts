import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { getChannel } from "./rabbit";
import { connectRabbit } from "./rabbit";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5005;

async function sendNotification(data: any) {
  console.log("sending notification to user:", data);
}

function startConsumer() {
  const channel = getChannel();

  channel.consume(
    "orders",
    async (msg: any) => {
      if (!msg) return;

      const data = JSON.parse(msg.content.toString());

      console.log("[notification] send:", data);

      await sendNotification(data);

      channel.ack(msg);
    },
    { noAck: false },
  );
}

async function bootstrap() {
  try {
    await connectRabbit({ retries: 20, baseDelayMs: 500 });

    console.log("RabbitMQ connected");

    startConsumer();

    app.listen(PORT, () => {
      console.log(`Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start service:", err);
    process.exit(1);
  }
}
bootstrap();

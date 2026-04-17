import amqp from "amqplib";

let channel: any;

export async function connectRabbit() {
  const connection = await amqp.connect("amqp://rabbitmq");
  channel = await connection.createChannel();

  await channel.assertQueue("orders");
}

export function publishOrderCreated(data: any) {
  channel.sendToQueue("orders", Buffer.from(JSON.stringify(data)));
}

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectRabbit } from "./rabbit";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5005;

async function bootstrap() {
  try {
    await connectRabbit({ retries: 20, baseDelayMs: 500 });

    console.log("RabbitMQ connected");

    app.listen(PORT, () => {
      console.log(`Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start service:", err);
    process.exit(1);
  }
}

bootstrap();

import dotenv from "dotenv";
import express from "express";
import { authProxy, userProxy } from "./proxy";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    "GATEWAY HIT:",
    req.method,
    "url=",
    req.url,
    "originalUrl=",
    req.originalUrl,
  );
  next();
});

app.use("/api/auth", authProxy);

app.use("/api/user", (req, _res, next) => {
  console.log(
    "HIT /api/user middleware:",
    req.method,
    req.url,
    "originalUrl=",
    req.originalUrl,
  );
  next();
});
app.use("/api/user", userProxy);

app.use("/api/user", userProxy);

app.listen(5000, () => console.log("Gateway running on port 5000"));

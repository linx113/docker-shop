import express from "express";
import { authProxy } from "./proxy";

const app = express();

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

app.listen(5000, () => {
  console.log("Gateway running on port 5000");
});

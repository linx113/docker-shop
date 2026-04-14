console.log("LOADED proxy.ts VERSION=2026-04-14-1");
import { createProxyMiddleware } from "http-proxy-middleware";

export const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL, // http://auth-service:5001
  changeOrigin: true,
  pathRewrite: (path) => `/auth${path}`,
});

export const userProxy = createProxyMiddleware({
  target: process.env.USER_SERVICE_URL, // http://user-service:5002
  changeOrigin: true,
  pathRewrite: (path) => `/user${path}`, // /getProfile -> /user/getProfile
});

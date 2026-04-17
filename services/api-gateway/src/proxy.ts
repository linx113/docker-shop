import "dotenv/config";
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

export const productsProxy = createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL, // http://product-service:5003
  changeOrigin: true,
  pathRewrite: (path) => `/products${path}`, // /getProducts -> /products/getProducts
});

export const orderProxy = createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL, // http://order-service:5004
  changeOrigin: true,
  pathRewrite: (path) => `/orders${path}`,
});

export const notificationProxy = createProxyMiddleware({
  target: process.env.NOTIFICATION_SERVICE_URL, // http://notification-service:5005
  changeOrigin: true,
  pathRewrite: (path) => `/notifications${path}`,
});
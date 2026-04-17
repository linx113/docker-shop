# 🛒 Microservice E-commerce Platform

## 📌 Project Description

This is a microservice-based e-commerce platform built for educational/exam purposes.

The system is designed using modern backend architecture principles:
- Microservices
- Event-driven architecture (RabbitMQ)
- Caching layer (Redis)
- Role-based access control (RBAC)
- REST API communication
- Frontend SPA (React)

---

## ⚙️ Tech Stack

### Frontend
- React (Vite)
- TypeScript
- TanStack Query
- Axios
- React Router

### Backend
- Node.js (Express)
- Supabase (PostgreSQL database)
- RabbitMQ (message broker)
- Redis (caching layer)
- JWT Authentication

### Infrastructure
- Docker / Docker Compose

---

## 🧩 Microservices Architecture

### 🔐 Auth Service
- User registration
- Login (JWT authentication)
- Role management (Admin / Customer)

---

### 👤 User Service
- User profile management
- User data retrieval

---

### 📦 Product Service
- POST | DELETE | GET products 
- Product listing
- Redis caching for product list and product details

---

### 🧾 Order Service
- Checkout / order creation
- Publishes events to RabbitMQ

---

### 📩 Notification Service
- Consumes RabbitMQ events
- Handles:
  - order.created
  - order.paid
  - user.registered
- Simulated email notifications (console logs)

---

## ⚡ Redis Caching

Redis is used in Product Service for:

- `GET /products`
- `GET /products/:id`

Features:
- TTL caching (60–300 seconds)
- Cache invalidation on:
  - product create
  - product delete

---

## 🔐 Authentication & Roles

### Roles:
- Admin
- Customer

### Access rules:

**Admin:**
- Manage products ( On Site )
- View all orders ( Supabase )

**Customer:**
- View products
- Add to cart
- Create orders
---

## 🖥️ Frontend Features

### Pages:
- Login / Register
- Product catalog
- Cart
- Checkout
- Admin dashboard

### Features:
- Role-based routing (guards)
- Global state management (TanStack Query)
- API integration via Axios

---

## 🐳 Docker Setup

### Run project:

```bash
docker-compose up --build

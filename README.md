# 🌦️ Weather App

A full-stack, containerized weather application using **React (Vite)** for the frontend, **Node.js** for the backend, **MongoDB** for data persistence, and a **WebSocket-based weather simulator** for real-time updates — all orchestrated using **Docker Compose**.

---

## 🧱 Tech Stack

- **Frontend**: React (Vite) + ApexCharts
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Real-Time Data**: WebSocket Weather Stream Simulator
- **DevOps**: Docker, Docker Compose

---

## 📦 Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running

---

## 🚀 How to Run the Project

Follow the steps below to build and run the app using Docker:

```bash
# Build the React Client
cd /react-client
npm run docker

# Build the Weather Stream Simulator
cd ../weather-stream-simulator
npm run docker

# Build the Node Server
cd ../node-server
npm run docker

# Start all service
cd ..
docker compose up
```


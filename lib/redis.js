require("dotenv").config();

const { createClient } = require("redis");

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    tls: true,
  },
});

redisClient.on("connect", () => {
  console.log("🔄 Connecting to Redis...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis Ready");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

module.exports = redisClient;
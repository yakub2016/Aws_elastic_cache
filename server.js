require("dotenv").config();

const express = require("express");
const redisClient = require("./lib/redis");

const app = express();

app.use(express.json());

// Connect to Redis when the server starts
(async () => {
  try {
    await redisClient.connect();

    console.log("✅ Redis Connected");

    const pong = await redisClient.ping();
    console.log("🏓 Redis Ping:", pong);
  } catch (err) {
    console.error("❌ Redis Connection Failed:", err);
  }
})();

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management API is running successfully!",
  });
});

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// Redis Test Route
app.get("/redis-test", async (req, res) => {
  try {
    const pong = await redisClient.ping();

    res.json({
      success: true,
      pong,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Your Routes
app.use("/students", require("./routes/student.route"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});

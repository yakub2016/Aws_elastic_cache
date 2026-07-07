
require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());
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

app.use("/students", require("./routes/student.route"));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
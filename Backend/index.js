require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const prisma = require("./src/config/db");
const authRoutes = require("./src/routes/authroutes");

const app = express();

const PORT = process.env.PORT || 8000;

// Connect Database
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
}

connectDB();

// =======================
// Middleware
// =======================

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// =======================
// Routes
// =======================

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Prophecy API is running",
  });
});

// =======================
// Server
// =======================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
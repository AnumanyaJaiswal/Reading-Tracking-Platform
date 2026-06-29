require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const prisma = require("./src/config/db");
const authRoutes = require("./src/routes/authroutes");

const app = express();
<<<<<<< HEAD
const authRoutes = require('./src/routes/authroutes')
const cookieParser = require('cookie-parser');
const bookRoutes = require('./src/routes/bookroutes')
const listRoute = require('./src/routes/listroutes')
const reviewRoute = require('./src/routes/reviewroutes')
const statsRoute = require('./src/routes/statsroute')


=======
>>>>>>> 9a88fc66761c92c76f38aa6bcd4a793ef5879be3

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
<<<<<<< HEAD
app.use('/auth' , authRoutes);
app.use('/books' , bookRoutes);
app.use('/lists' , listRoute);
app.use('/reviews' , reviewRoute);
app.use('/stats' , statsRoute);
=======
>>>>>>> 9a88fc66761c92c76f38aa6bcd4a793ef5879be3

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
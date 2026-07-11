require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const prisma = require("./src/config/db");
const authRoutes = require("./src/routes/authroutes");

const bookRoutes = require('./src/routes/bookroutes')
const listRoute = require('./src/routes/listroutes')
const reviewRoute = require('./src/routes/reviewroutes')
const statsRoute = require('./src/routes/statsroute')
const clubRoutes = require("./src/routes/clubroutes");

const setupSocket = require('./src/socket')

const PORT = process.env.PORT || 8000;

//For socket.io
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
      origin: process.env.FRONTEND_URL,
      credentials:true
  }
})

setupSocket(io);


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
app.use('/auth' , authRoutes);
app.use('/books' , bookRoutes);
app.use('/lists' , listRoute);
app.use('/reviews' , reviewRoute);
app.use('/stats' , statsRoute);
app.use("/clubs", clubRoutes);

// =======================
// Routes
// =======================

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

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
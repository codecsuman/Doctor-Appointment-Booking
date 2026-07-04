import "dotenv-flow/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// ================================
// Database & Cloudinary
// ================================
connectDB();
connectCloudinary();

// ================================
// Middlewares
// ================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// CORS Configuration
// ================================
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://192.168.1.37:5173",
  "http://192.168.1.37:5174",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.error(`❌ Blocked by CORS: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

// ================================
// Routes
// ================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Doctor Appointment API is running 🚀",
  });
});

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// ================================
// 404 Handler
// ================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// ================================
// Global Error Handler
// ================================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

// ================================
// Start Server
// ================================
app.listen(port, () => {
  console.log("======================================");
  console.log(`🚀 Server Running on Port : ${port}`);
  console.log(`🌍 Environment            : ${process.env.NODE_ENV}`);
  console.log("🗄️ MongoDB               : Connected");
  console.log(`☁️ Cloudinary            : ${process.env.CLOUDINARY_NAME}`);
  console.log(`💳 Payment Mode          : ${process.env.PAYMENT_MODE}`);
  console.log("======================================");
});
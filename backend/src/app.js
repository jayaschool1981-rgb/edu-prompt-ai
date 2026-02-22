// ======================================
// EDU PROMPT AI - EXPRESS APP
// Production Ready Version
// ======================================

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

/* ======================================
   SECURITY MIDDLEWARE
====================================== */

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* ======================================
   ROOT & HEALTH CHECK
====================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Edu Prompt AI Backend Live 🚀",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
  });
});

/* ======================================
   API ROUTES
====================================== */

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

/* ======================================
   404 HANDLER
====================================== */

app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

/* ======================================
   GLOBAL ERROR HANDLER
====================================== */

app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.message);

  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
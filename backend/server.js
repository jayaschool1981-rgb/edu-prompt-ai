// ==============================
// EDU PROMPT AI - SERVER ENTRY
// Production Ready Version
// ==============================

require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");

// ==============================
// ENV VALIDATION
// ==============================

const requiredEnv = ["MONGO_URI", "JWT_SECRET"];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

const PORT = process.env.PORT || 5000;

// ==============================
// MONGODB CONNECTION + SERVER START
// ==============================

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB Connected");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Graceful Shutdown
    process.on("SIGINT", async () => {
      console.log("🛑 Shutting down server...");
      await mongoose.connection.close();
      server.close(() => {
        console.log("✅ Server closed safely");
        process.exit(0);
      });
    });

  } catch (err) {
    console.error("❌ Failed to start server");
    console.error(err.message);
    process.exit(1);
  }
};

startServer();
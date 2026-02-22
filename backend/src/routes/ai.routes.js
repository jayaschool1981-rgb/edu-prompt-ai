// ======================================
// AI Routes - Production Grade
// CommonJS Version
// ======================================

const express = require("express");
const router = express.Router();

const { executePrompt } = require("../controllers/ai.controller");
const verifyToken = require("../middleware/auth.middleware");

// ==============================
// AI PROMPT EXECUTION
// ==============================
// Protected Route
// Requires JWT Token
// ==============================

router.post(
  "/run",
  verifyToken, // 🔐 Protect route
  async (req, res, next) => {
    try {
      await executePrompt(req, res);
    } catch (error) {
      next(error); // Pass to global error handler
    }
  }
);

// ==============================
// EXPORT
// ==============================

module.exports = router;
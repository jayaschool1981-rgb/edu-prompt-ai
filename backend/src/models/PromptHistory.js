const mongoose = require("mongoose");

const promptHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    promptText: {
      type: String,
      required: true,
    },
    aiResponse: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PromptHistory", promptHistorySchema);
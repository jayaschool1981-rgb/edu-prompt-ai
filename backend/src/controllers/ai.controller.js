const PromptHistory = require("../models/PromptHistory");
const { generateAIResponse } = require("../services/ai.service");

const runPrompt = async (req, res) => {
  try {
    const { category, topic, grade, difficulty } = req.body;

    if (!category || !topic || !grade || !difficulty) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const structuredPrompt = `
You are an AI teaching assistant.

Category: ${category}
Topic: ${topic}
Grade Level: ${grade}
Difficulty: ${difficulty}

Generate a well-structured educational response.
`;

    const aiResponse = await generateAIResponse(structuredPrompt);

    await PromptHistory.create({
      userId: req.user.id,
      role: req.user.role,
      category,
      topic,
      grade,
      difficulty,
      promptText: structuredPrompt,
      aiResponse,
    });

    res.json({ aiResponse });

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ message: "AI generation failed" });
  }
};

module.exports = { runPrompt };
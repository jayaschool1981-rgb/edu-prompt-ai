const axios = require("axios");

const runAI = async (prompt) => {
  const response = await axios.post(
    process.env.AI_ENDPOINT,
    {
      model: process.env.AI_MODEL,
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};

module.exports = {
  runAI,
};
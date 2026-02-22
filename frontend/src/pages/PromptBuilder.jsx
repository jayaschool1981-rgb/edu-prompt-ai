import { useState } from "react";
import axios from "axios";

function PromptBuilder() {
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePrompt = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/run`,
        { category, topic, grade, difficulty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResponse(res.data.aiResponse);
    } catch (error) {
      alert("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">AI Prompt Builder</h2>

      <div className="grid gap-4">
        <input
          placeholder="Category"
          className="border p-3 rounded"
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          placeholder="Topic"
          className="border p-3 rounded"
          onChange={(e) => setTopic(e.target.value)}
        />

        <input
          placeholder="Grade"
          className="border p-3 rounded"
          onChange={(e) => setGrade(e.target.value)}
        />

        <select
          className="border p-3 rounded"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button
          onClick={generatePrompt}
          className="bg-black text-white p-3 rounded hover:opacity-80"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {response && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">AI Response:</h3>
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
}

export default PromptBuilder;
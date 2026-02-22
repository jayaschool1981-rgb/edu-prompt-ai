import { useState } from "react";
import api from "../api/axios";

export default function PromptRunner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const runPrompt = async () => {
    const res = await api.post("/api/ai/run", { prompt: input });
    setOutput(res.data.result);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>AI Prompt Runner</h2>
      <textarea rows="6" style={{ width: "100%" }} onChange={(e) => setInput(e.target.value)} />
      <button onClick={runPrompt}>Run</button>
      <pre>{output}</pre>
    </div>
  );
}
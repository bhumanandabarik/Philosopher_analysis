import { callLLM } from "./llmService.js";
import { conflictPrompt } from "../prompts/conflictPrompt.js";

export const resolveConflict = async (input) => {
  try {
    const response = await callLLM(conflictPrompt(input));

    // remove markdown if model adds it
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Conflict Resolver Error:", err.message);

    return {
      error: "Could not resolve conflict",
    };
  }
};
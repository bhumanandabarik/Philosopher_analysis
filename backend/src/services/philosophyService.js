import { callLLM } from "./llmService.js";
import { stoicPrompt, buddhistPrompt, gitaPrompt } from "../prompts/philosophyPrompts.js";

export const getPhilosophyResponse = async (input) => {
  const [stoic, buddhist, gita] = await Promise.all([
    callLLM(stoicPrompt(input)),
    callLLM(buddhistPrompt(input)),
    callLLM(gitaPrompt(input)),
  ]);

  return {
    stoic,
    buddhist,
    gita,
  };
};
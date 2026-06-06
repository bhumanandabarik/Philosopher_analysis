import { callLLM } from "./llmService.js";

import {
  stoicDebatePrompt,
  buddhistDebatePrompt,
  nietzscheDebatePrompt,
  moderatorPrompt,
  critiquePrompt,
  alignmentPrompt,
} from "../prompts/debatePrompt.js";

const cleanText = (text) =>
  text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/\\u0027/g, "'")
    .trim();

export const generateDebate  = async (input) => {
  try {

    // Parallel philosopher reasoning
    const [stoic, buddhist, nietzsche] =
      await Promise.all([
        callLLM(stoicDebatePrompt(input)),
        callLLM(buddhistDebatePrompt(input)),
        callLLM(nietzscheDebatePrompt(input)),
      ]);

    // =========================
    // CRITIQUES
    // =========================

    // Nietzsche attacks Stoic

    const stoicCritique = await callLLM(

      critiquePrompt(
        "Nietzsche",
        stoic,
        input
      )
    );

    // Stoic attacks Nietzsche

    const nietzscheCritique = await callLLM(

      critiquePrompt(
        "Stoic",
        nietzsche,
        input
      )
    );

    // Buddhist critiques both

    const buddhistCritique = await callLLM(

      critiquePrompt(
        "Buddhist Monk",
        `
        Stoic said:
        ${stoic}

        Nietzsche said:
        ${nietzsche}
        `,
        input
      )
    );

    // Moderator synthesis
    const moderator = await callLLM(
      moderatorPrompt(
        input,
        stoic,
        buddhist,
        nietzsche
      )
    );

    const alignmentResponse = await callLLM(

      alignmentPrompt(
        input,
        stoic,
        buddhist,
        nietzsche
      )
    );


    const alignmentCleaned = alignmentResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let alignment = {
      stoic: 33,
      buddhist: 33,
      nietzsche: 34,
    };

    try {

      alignment = JSON.parse(alignmentCleaned);

    } catch (err) {

      console.error("Alignment Parse Error");
    }


    return {
      stoic: cleanText(stoic),
      buddhist: cleanText(buddhist),
      nietzsche: cleanText(nietzsche),
      stoicCritique: cleanText(stoicCritique),
      nietzscheCritique: cleanText(nietzscheCritique),
      buddhistCritique: cleanText(buddhistCritique),
      moderator: cleanText(moderator),
      alignment,
    };

  } catch (err) {

    console.error(
      "Debate Service Error:",
      err.response?.data || err.message
    );

    return {
      error: "Debate generation failed",
    };
  }
};
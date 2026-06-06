export const conflictPrompt = (input) => `
You are an expert in human psychology and philosophical reasoning.

A user is facing an internal conflict.

User Problem:
"${input}"

Your task:

1. Identify the TWO strongest conflicting inner voices.
2. Give each voice:
   - a short name
   - core fear
   - core desire

3. Explain the internal tension clearly.

Respond ONLY in JSON format:

{
  "voiceA": {
    "name": "",
    "fear": "",
    "desire": ""
  },
  "voiceB": {
    "name": "",
    "fear": "",
    "desire": ""
  },
  "coreConflict": ""
}
`;
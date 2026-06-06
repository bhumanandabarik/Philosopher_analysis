import axios from "axios";

const API_KEY = process.env.GROQ_API_KEY;
console.log("API_KEY:", process.env.GROQ_API_KEY);

export const callLLM = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",  // 🔥 fast & good for MVP
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
    //return "groq working"
  } catch (err) {
    console.error("GROQ ERROR:", err.response?.data || err.message);
    //console.log("GROQ:", process.env.GROQ_API_KEY);
    throw err;
  }
};

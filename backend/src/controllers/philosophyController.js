import { getPhilosophyResponse } from "../services/philosophyService.js";

export const handlePhilosophy = async (req, res) => {
  try {
    const { problem } = req.body;

    const result = await getPhilosophyResponse(problem);

    res.json(result);
  } catch (err) {
    console.error("FULL ERROR:", err);   // 👈 important
    console.error("RESPONSE:", err.response?.data); // 👈 for API errors
    res.status(500).json({ error: "Something went wrong" });
  }
};
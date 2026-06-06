import { generateDebate } from "../services/debateService.js";

export const handleDebate = async (req, res) => {
  try {
    const { problem } = req.body;

    if (!problem) {
      return res.status(400).json({
        error: "Problem is required",
      });
    }

    const result = await generateDebate(problem);

    res.json(result);

  } catch (err) {
    console.error(
      "Debate Controller Error:",
      err.response?.data || err.message
    );

    res.status(500).json({
      error: "Debate generation failed",
    });
  }
};
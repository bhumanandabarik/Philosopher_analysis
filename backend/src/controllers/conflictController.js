import { resolveConflict } from "../services/conflictService.js";

export const handleConflict = async (req, res) => {
  try {
    const { problem } = req.body;

    if (!problem) {
      return res.status(400).json({
        error: "Problem is required",
      });
    }

    const result = await resolveConflict(problem);

    res.json(result);

  } catch (err) {
    console.error(
      "Conflict Controller Error:",
      err.response?.data || err.message
    );

    res.status(500).json({
      error: "Conflict resolution failed",
    });
  }
};
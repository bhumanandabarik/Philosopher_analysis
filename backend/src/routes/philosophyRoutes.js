import express from "express";
import { handlePhilosophy } from "../controllers/philosophyController.js";

const router = express.Router();

router.post("/", handlePhilosophy);

export default router;
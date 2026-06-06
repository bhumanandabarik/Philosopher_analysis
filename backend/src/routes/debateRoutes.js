import express from "express";
import { handleDebate } from "../controllers/debateController.js";

const router = express.Router();

router.post("/", handleDebate);

export default router;
import express from "express";
import { handleConflict } from "../controllers/conflictController.js";

const router = express.Router();

router.post("/", handleConflict);

export default router;
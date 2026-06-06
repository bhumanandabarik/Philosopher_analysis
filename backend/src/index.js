import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import philosophyRoutes from "./routes/philosophyRoutes.js";
import conflictRoutes from "./routes/conflictRoutes.js";
import debateRoutes from "./routes/debateRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/philosophy", philosophyRoutes);
app.use("/api/conflict", conflictRoutes);
app.use("/api/debate", debateRoutes);

//const PORT = 5000;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
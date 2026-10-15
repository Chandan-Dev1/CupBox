import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/database.js";
import linkRoutes from "./routes/link.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("./public"))

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(linkRoutes);

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

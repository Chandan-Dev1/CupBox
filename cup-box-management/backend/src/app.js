import express from "express";
import cors from "cors";
import cupRoutes from "./routes/cup.routes.js";
import boxRoutes from "./routes/box.routes.js";
import capacityRoutes from "./routes/capacity.routes.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.get("/", (_req, res) => res.json({ message: "Cup & Box API is running" }));
app.use("/api/cups", cupRoutes);
app.use("/api/boxes", boxRoutes);
app.use("/api/capacity", capacityRoutes);
export default app;

import express from "express";
import ExRouter from "./routes/expense.router.js";
import morgan from 'morgan'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(morgan('dev')); 
app.use(express.static("./src/public"));
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/expense", ExRouter);

export default app;
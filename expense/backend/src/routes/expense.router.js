import express from "express";
import {
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense
} from "../controllers/expense.controller.js";

const ExpenseRouter = express.Router();

ExpenseRouter.post("/create", createExpense);

ExpenseRouter.get("/get", getExpense);

ExpenseRouter.delete("/delete/:id", deleteExpense);

ExpenseRouter.patch("/update/:id", updateExpense);

export default ExpenseRouter;
import ExpenseModel from "../models/expense.model.js";


export async function createExpense(req, res) {
  try {
    const { title, amount, category, date } = req.body;

    const expense = await ExpenseModel.create({
      title,
      amount,
      category,
      date,
    });

    res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.error("Create expense error:", error.message);

    res.status(500).json({
      message: "Failed to create expense",
      error: error.message,
    });
  }
}



export async function getExpense(req, res) {
  try {
    const expense = await ExpenseModel.find();

    res.status(200).json({
      message: "Data fetched successfully",
      expense,
    });
  } catch (error) {
    console.error("Get expense error:", error.message);

    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
}


export async function deleteExpense(req, res) {
  try {
    const { id } = req.params;

    const expense = await ExpenseModel.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
      expense,
    });
  } catch (error) {
    console.error("Delete expense error:", error.message);

    res.status(500).json({
      message: "Failed to delete expense",
      error: error.message,
    });
  }
}


export async function updateExpense(req, res) {
  try {
    const { id } = req.params;

    const {
      title,
      amount,
      category,
      date
    } = req.body;

    const expense = await ExpenseModel.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        category,
        date
      },
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      expense
    });

  } catch (error) {
    console.error("Update expense error:", error.message);

    res.status(400).json({
      message: "Failed to update expense",
      error: error.message
    });
  }
}
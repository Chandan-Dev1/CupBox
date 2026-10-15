import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../service/expense.service";

const getErrorMessage = (error, fallback) => {
  if (error.code === "ERR_NETWORK") {
    return "Cannot reach the server. Please check that the backend is running.";
  }

  if (error.code === "ECONNABORTED") {
    return "Request timed out. Please try again.";
  }

  return error.response?.data?.message || fallback;
};

// Get all expenses
export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getExpenses();
      return data.expense || [];
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch expenses")
      );
    }
  }
);

// Create
export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expenseData, { rejectWithValue }) => {
    try {
      const data = await createExpense(expenseData);
      return data.expense;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to create expense")
      );
    }
  }
);

// Update
export const editExpense = createAsyncThunk(
  "expense/editExpense",
  async ({ id, expenseData }, { rejectWithValue }) => {
    try {
      const data = await updateExpense(id, expenseData);
      return data.expense;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to update expense")
      );
    }
  }
);

// Delete
export const removeExpense = createAsyncThunk(
  "expense/removeExpense",
  async (id, { rejectWithValue }) => {
    try {
      await deleteExpense(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to delete expense")
      );
    }
  }
);

const initialState = {
  expenses: [],
  loading: false, // list fetch ke liye
  submitting: false, // add / edit / delete ke liye
  error: "",
  success: "",
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    clearSuccess: (state) => {
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addExpense.pending, (state) => {
        state.submitting = true;
        state.error = "";
        state.success = "";
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.submitting = false;
        state.expenses.unshift(action.payload);
        state.success = "Expense added successfully";
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // Edit
      .addCase(editExpense.pending, (state) => {
        state.submitting = true;
        state.error = "";
        state.success = "";
      })
      .addCase(editExpense.fulfilled, (state, action) => {
        state.submitting = false;
        state.expenses = state.expenses.map((expense) =>
          expense._id === action.payload._id ? action.payload : expense
        );
        state.success = "Expense updated successfully";
      })
      .addCase(editExpense.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(removeExpense.pending, (state) => {
        state.submitting = true;
        state.error = "";
        state.success = "";
      })
      .addCase(removeExpense.fulfilled, (state, action) => {
        state.submitting = false;
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== action.payload
        );
        state.success = "Expense deleted";
      })
      .addCase(removeExpense.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = expenseSlice.actions;

export default expenseSlice.reducer;

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchExpenses,
  addExpense as addExpenseThunk,
  editExpense as editExpenseThunk,
  removeExpense as removeExpenseThunk,
  clearError as clearErrorAction,
  clearSuccess as clearSuccessAction,
} from "../state/expense.slice";

const useExpense = () => {
  const dispatch = useDispatch();

  const { expenses, loading, submitting, error, success } = useSelector(
    (state) => state.expense
  );

  const refetch = useCallback(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  // .unwrap() fail hone par throw karta hai, isliye true/false return kar rahe hain
  const addExpense = async (expenseData) => {
    try {
      await dispatch(addExpenseThunk(expenseData)).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  const editExpense = async (id, expenseData) => {
    try {
      await dispatch(editExpenseThunk({ id, expenseData })).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  const removeExpense = async (id) => {
    try {
      await dispatch(removeExpenseThunk(id)).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  const clearError = useCallback(() => {
    dispatch(clearErrorAction());
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch(clearSuccessAction());
  }, [dispatch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    expenses,
    loading,
    submitting,
    error,
    success,
    refetch,
    addExpense,
    editExpense,
    removeExpense,
    clearError,
    clearSuccess,
  };
};

export default useExpense;

import { useCallback, useMemo, useRef, useState } from "react";

import useExpense from "../hook/useExpense";

import CategoryBreakdown from "../components/CategoryBreakdown";
import CategoryFilter from "../components/CategoryFilter";
import ConfirmModal from "../components/ConfirmModal";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import SummaryCards from "../components/SummaryCards";
import Toast from "../components/Toast";

import { isInCurrentMonth } from "../utils/format";

const Expense = () => {
  const {
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
  } = useExpense();

  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [filter, setFilter] = useState("All");

  const formRef = useRef(null);

  // Filter (stored data change nahi hota)
  const filteredExpenses = useMemo(
    () =>
      filter === "All"
        ? expenses
        : expenses.filter((expense) => expense.category === filter),
    [expenses, filter]
  );

  // Total of currently displayed expenses
  const totalAmount = useMemo(
    () =>
      filteredExpenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
      ),
    [filteredExpenses]
  );

  const monthTotal = useMemo(
    () =>
      filteredExpenses
        .filter((expense) => isInCurrentMonth(expense.date))
        .reduce((total, expense) => total + Number(expense.amount), 0),
    [filteredExpenses]
  );

  // Submit (add / update)
  const handleSubmit = async (expenseData) => {
    const ok = editingExpense
      ? await editExpense(editingExpense._id, expenseData)
      : await addExpense(expenseData);

    if (ok) setEditingExpense(null);

    return ok;
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);

    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCancelEdit = useCallback(() => setEditingExpense(null), []);

  const handleConfirmDelete = async () => {
    const id = expenseToDelete._id;
    const ok = await removeExpense(id);

    if (ok && editingExpense?._id === id) setEditingExpense(null);

    setExpenseToDelete(null);
  };

  const showFetchError = error && !loading && expenses.length === 0;

  return (
    <div className="min-h-screen pb-16">
      <Toast message={success} type="success" onClose={clearSuccess} />

      {/* Action errors toast ki tarah, fetch error neeche banner me */}
      {!showFetchError && (
        <Toast message={error} type="error" onClose={clearError} />
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur ring-1 ring-slate-200">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-5">
          <div
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white"
          >
            💸
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Expense Tracker
            </h1>

            <p className="text-sm text-slate-500">
              Track your daily spending in one place
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6">
        <SummaryCards
          total={totalAmount}
          count={filteredExpenses.length}
          monthTotal={monthTotal}
          filterLabel={
            filter === "All" ? "All categories" : `Category: ${filter}`
          }
        />

        <div className="grid items-start gap-6 lg:grid-cols-5">
          {/* Left: form + breakdown */}
          <div className="space-y-6 lg:col-span-2" ref={formRef}>
            <ExpenseForm
              key={editingExpense?._id || "new"}
              editingExpense={editingExpense}
              onSubmit={handleSubmit}
              onCancel={handleCancelEdit}
              submitting={submitting}
            />

            <CategoryBreakdown expenses={expenses} />
          </div>

          {/* Right: filter + list */}
          <div className="space-y-4 lg:col-span-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Your expenses
            </h2>

            <CategoryFilter value={filter} onChange={setFilter} />

            {showFetchError ? (
              <div className="rounded-2xl bg-red-50 p-6 text-center ring-1 ring-red-200">
                <p className="font-semibold text-red-700">
                  Couldn&apos;t load expenses
                </p>

                <p className="mt-1 text-sm text-red-600">{error}</p>

                <button
                  type="button"
                  onClick={refetch}
                  className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
                >
                  Try again
                </button>
              </div>
            ) : (
              <ExpenseList
                expenses={filteredExpenses}
                hasAnyExpense={expenses.length > 0}
                loading={loading}
                disabled={submitting}
                editingId={editingExpense?._id}
                onEdit={handleEdit}
                onDelete={setExpenseToDelete}
              />
            )}
          </div>
        </div>
      </main>

      <ConfirmModal
        expense={expenseToDelete}
        busy={submitting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setExpenseToDelete(null)}
      />
    </div>
  );
};

export default Expense;

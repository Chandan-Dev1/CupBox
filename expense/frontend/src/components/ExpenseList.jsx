import { categoryMeta } from "../state/expense.state";
import { formatCurrency, formatDate } from "../utils/format";

const SkeletonRow = () => (
  <div className="flex animate-pulse items-center gap-4 p-4 sm:p-5">
    <div className="h-11 w-11 rounded-xl bg-slate-200" />

    <div className="flex-1 space-y-2">
      <div className="h-4 w-1/3 rounded bg-slate-200" />
      <div className="h-3 w-1/4 rounded bg-slate-100" />
    </div>

    <div className="h-5 w-16 rounded bg-slate-200" />
  </div>
);

const EmptyState = ({ hasAnyExpense }) => (
  <div className="px-6 py-14 text-center">
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl">
      🧾
    </div>

    <p className="text-lg font-semibold text-slate-800">
      {hasAnyExpense ? "No expenses in this category" : "No expenses yet"}
    </p>

    <p className="mt-1 text-sm text-slate-500">
      {hasAnyExpense
        ? "Try another category or add a new expense."
        : "Add your first expense using the form above."}
    </p>
  </div>
);

const ExpenseItem = ({ expense, onEdit, onDelete, disabled, isEditing }) => {
  const meta = categoryMeta[expense.category] || categoryMeta.Other;

  return (
    <li
      className={`flex flex-col gap-3 p-4 transition sm:flex-row sm:items-center sm:justify-between sm:p-5 ${
        isEditing ? "bg-indigo-50/60" : "hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl"
        >
          {meta.emoji}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900">
            {expense.title}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span
              className={`rounded-full px-2.5 py-0.5 font-medium ring-1 ring-inset ${meta.badge}`}
            >
              {expense.category}
            </span>

            <span>{formatDate(expense.date)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <p className="text-lg font-bold text-slate-900">
          {formatCurrency(expense.amount)}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(expense)}
            disabled={disabled}
            aria-label={`Edit ${expense.title}`}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(expense)}
            disabled={disabled}
            aria-label={`Delete ${expense.title}`}
            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

const ExpenseList = ({
  expenses,
  hasAnyExpense,
  loading,
  disabled,
  editingId,
  onEdit,
  onDelete,
}) => (
  <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
    {loading ? (
      <div className="divide-y divide-slate-100">
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    ) : expenses.length === 0 ? (
      <EmptyState hasAnyExpense={hasAnyExpense} />
    ) : (
      <ul className="divide-y divide-slate-100">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
            disabled={disabled}
            isEditing={expense._id === editingId}
          />
        ))}
      </ul>
    )}
  </div>
);

export default ExpenseList;

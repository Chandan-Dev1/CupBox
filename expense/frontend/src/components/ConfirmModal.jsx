import { useEffect } from "react";

import { formatCurrency } from "../utils/format";

const ConfirmModal = ({ expense, onConfirm, onCancel, busy }) => {
  useEffect(() => {
    if (!expense) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [expense, onCancel]);

  if (!expense) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-40 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
          🗑️
        </div>

        <h3 id="confirm-title" className="text-lg font-semibold text-slate-900">
          Delete this expense?
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          <span className="font-medium text-slate-700">{expense.title}</span> (
          {formatCurrency(expense.amount)}) will be removed permanently. This
          cannot be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {busy ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

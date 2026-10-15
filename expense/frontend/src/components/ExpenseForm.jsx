import { useState } from "react";

import { categories, getInitialExpense } from "../state/expense.state";
import { toInputDate } from "../utils/format";

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition placeholder:text-slate-400 focus:ring-2 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
  }`;

const Field = ({ id, label, error, children }) => (
  <div>
    <label
      htmlFor={id}
      className="mb-1.5 block text-sm font-medium text-slate-700"
    >
      {label}
    </label>

    {children}

    {error && (
      <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
);

// Parent isko key={editingExpense?._id || "new"} ke saath render karta hai,
// isliye edit change hone par form apne aap reset hota hai.
const ExpenseForm = ({ editingExpense, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState(() =>
    editingExpense
      ? {
          title: editingExpense.title,
          amount: editingExpense.amount,
          category: editingExpense.category,
          date: toInputDate(editingExpense.date),
        }
      : getInitialExpense()
  );

  const [errors, setErrors] = useState({});

  const isEditing = Boolean(editingExpense);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};

    if (!form.title.trim()) {
      next.title = "Please enter a title";
    }

    if (!form.amount || Number(form.amount) <= 0) {
      next.amount = "Amount must be greater than 0";
    }

    if (!form.category) {
      next.category = "Please select a category";
    }

    if (!form.date) {
      next.date = "Please select a date";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const success = await onSubmit({
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    });

    if (success && !isEditing) {
      setForm(getInitialExpense());
    }
  };

  return (
    <section
      className={`rounded-2xl bg-white p-5 shadow-sm ring-1 sm:p-6 ${
        isEditing ? "ring-2 ring-indigo-400" : "ring-slate-200"
      }`}
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          {isEditing ? "✏️ Edit expense" : "➕ Add expense"}
        </h2>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            Cancel
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid gap-4 sm:grid-cols-2"
      >
        <Field id="title" label="Title" error={errors.title}>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Lunch"
            maxLength={80}
            autoComplete="off"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
            className={inputClass(errors.title)}
          />
        </Field>

        <Field id="amount" label="Amount (₹)" error={errors.amount}>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              ₹
            </span>

            <input
              id="amount"
              name="amount"
              type="number"
              inputMode="decimal"
              value={form.amount}
              onChange={handleChange}
              placeholder="150"
              min="0.01"
              step="0.01"
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={errors.amount ? "amount-error" : undefined}
              className={`${inputClass(errors.amount)} pl-9`}
            />
          </div>
        </Field>

        <Field id="category" label="Category" error={errors.category}>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass(errors.category)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>

        <Field id="date" label="Date" error={errors.date}>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
            className={inputClass(errors.date)}
          />
        </Field>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Saving..."
              : isEditing
              ? "Update expense"
              : "Add expense"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ExpenseForm;

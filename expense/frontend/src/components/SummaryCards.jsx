import { formatCurrency } from "../utils/format";

const Card = ({ label, value, hint, className = "" }) => (
  <div className={`rounded-2xl p-5 shadow-sm ${className}`}>
    <p className="text-sm font-medium opacity-80">{label}</p>

    <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
      {value}
    </p>

    <p className="mt-1 text-xs opacity-70">{hint}</p>
  </div>
);

const SummaryCards = ({ total, count, monthTotal, filterLabel }) => (
  <div className="grid gap-4 sm:grid-cols-3">
    <Card
      label="Total expenses"
      value={formatCurrency(total)}
      hint={filterLabel}
      className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white sm:col-span-1"
    />

    <Card
      label="Number of expenses"
      value={count}
      hint={count === 1 ? "1 entry shown" : `${count} entries shown`}
      className="bg-white text-slate-900 ring-1 ring-slate-200"
    />

    <Card
      label="This month"
      value={formatCurrency(monthTotal)}
      hint="Spent in the current month"
      className="bg-white text-slate-900 ring-1 ring-slate-200"
    />
  </div>
);

export default SummaryCards;

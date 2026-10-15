import { categories, categoryMeta } from "../state/expense.state";
import { formatCurrency } from "../utils/format";

const CategoryBreakdown = ({ expenses }) => {
  const totals = categories.map((category) => ({
    category,
    total: expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + Number(expense.amount), 0),
  }));

  const grandTotal = totals.reduce((sum, item) => sum + item.total, 0);

  if (grandTotal === 0) return null;

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-base font-semibold text-slate-900">By category</h2>

      <div className="mt-4 space-y-4">
        {totals.map(({ category, total }) => {
          const percent = Math.round((total / grandTotal) * 100);

          return (
            <div key={category}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">
                  {categoryMeta[category].emoji} {category}
                </span>

                <span className="text-slate-500">
                  {formatCurrency(total)} · {percent}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${categoryMeta[category].bar}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryBreakdown;

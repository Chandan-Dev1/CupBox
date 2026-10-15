import { categories, categoryMeta } from "../state/expense.state";

const baseChip =
  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";

const CategoryFilter = ({ value, onChange }) => (
  <div
    className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    role="group"
    aria-label="Filter by category"
  >
    <button
      type="button"
      onClick={() => onChange("All")}
      aria-pressed={value === "All"}
      className={`${baseChip} ${
        value === "All"
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
      }`}
    >
      All
    </button>

    {categories.map((category) => (
      <button
        key={category}
        type="button"
        onClick={() => onChange(category)}
        aria-pressed={value === category}
        className={`${baseChip} ${
          value === category
            ? categoryMeta[category].chipActive
            : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
        }`}
      >
        {categoryMeta[category].emoji} {category}
      </button>
    ))}
  </div>
);

export default CategoryFilter;

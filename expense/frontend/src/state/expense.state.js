// Backend model ke category enum se match karna chahiye
export const categories = ["Food", "Transport", "Shopping", "Other"];

// Category ke hisaab se emoji + colors (Tailwind classes)
export const categoryMeta = {
  Food: {
    emoji: "🍔",
    badge: "bg-orange-100 text-orange-700 ring-orange-200",
    bar: "bg-orange-400",
    chipActive: "bg-orange-500 text-white",
  },
  Transport: {
    emoji: "🚌",
    badge: "bg-sky-100 text-sky-700 ring-sky-200",
    bar: "bg-sky-400",
    chipActive: "bg-sky-500 text-white",
  },
  Shopping: {
    emoji: "🛍️",
    badge: "bg-pink-100 text-pink-700 ring-pink-200",
    bar: "bg-pink-400",
    chipActive: "bg-pink-500 text-white",
  },
  Other: {
    emoji: "📦",
    badge: "bg-slate-100 text-slate-700 ring-slate-200",
    bar: "bg-slate-400",
    chipActive: "bg-slate-600 text-white",
  },
};

export const getTodayDate = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;

  return new Date(now.getTime() - offset).toISOString().substring(0, 10);
};

export const getInitialExpense = () => ({
  title: "",
  amount: "",
  category: categories[0],
  date: getTodayDate(),
});

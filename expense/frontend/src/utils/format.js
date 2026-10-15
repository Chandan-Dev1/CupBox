export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

// UTC use kar rahe hain taaki time zone ki wajah se din aage-peeche na ho
export const formatDate = (value) => {
  if (!value) return "No date";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

export const toInputDate = (value) =>
  value ? new Date(value).toISOString().substring(0, 10) : "";

export const isInCurrentMonth = (value) => {
  if (!value) return false;

  const date = new Date(value);
  const now = new Date();

  return (
    date.getUTCFullYear() === now.getFullYear() &&
    date.getUTCMonth() === now.getMonth()
  );
};

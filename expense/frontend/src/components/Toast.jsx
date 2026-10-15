import { useEffect } from "react";

const styles = {
  success: "bg-emerald-600",
  error: "bg-red-600",
};

const Toast = ({ message, type = "success", onClose, duration = 3500 }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(onClose, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <div
        className={`animate-toast-in pointer-events-auto flex max-w-md items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${styles[type]}`}
      >
        <span aria-hidden="true">{type === "success" ? "✓" : "!"}</span>

        <span>{message}</span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="ml-2 rounded p-1 text-white/80 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;

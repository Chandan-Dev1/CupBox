import { useState } from "react";
import { createShortLink } from "../api/link.api";

function UrlForm({ onSuccess }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      const data = await createShortLink(url);
      onSuccess(data);
      setUrl("");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to shorten URL"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        className="w-full rounded-lg border px-4 py-3"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a long URL, e.g. https://example.com"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        className="rounded-lg bg-blue-600 px-5 py-3 text-white disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
}

export default UrlForm;

import { useState } from "react";

function ShortUrlCard({ link }) {
  const [copied, setCopied] = useState(false);

  if (!link) return null;

  async function handleCopy() {
    await navigator.clipboard.writeText(link.shortUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-xl font-semibold">Your Short URL</h2>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className="flex-1 rounded-lg border px-4 py-3"
          value={link.shortUrl}
          readOnly
        />

        <button
          className="rounded-lg bg-green-600 px-5 py-3 text-white"
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default ShortUrlCard;

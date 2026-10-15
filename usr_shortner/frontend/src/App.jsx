import { useEffect, useState } from "react";
import UrlForm from "./components/UrlForm";
import ShortUrlCard from "./components/ShortUrlCard";
import LinkHistory from "./components/LinkHistory";
import { getLinks } from "./api/link.api";

function App() {
  const [shortLink, setShortLink] = useState(null);
  const [links, setLinks] = useState([]);

  async function loadLinks() {
    try {
      const data = await getLinks();
      setLinks(data.links);
    } catch (error) {
      console.error("Failed to load links", error);
    }
  }

  function handleSuccess(data) {
    setShortLink(data);
    loadLinks();
  }

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold">URL Shortener</h1>
          <p className="mt-2 text-gray-600">
            Paste a long URL and create a short link.
          </p>

          <div className="mt-6">
            <UrlForm onSuccess={handleSuccess} />
          </div>
        </div>

        <ShortUrlCard link={shortLink} />
        <LinkHistory links={links} />
      </div>
    </main>
  );
}

export default App;

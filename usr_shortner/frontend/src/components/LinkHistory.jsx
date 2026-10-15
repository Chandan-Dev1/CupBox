function LinkHistory({ links }) {
  return (
    <div className="mt-8 overflow-x-auto rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Recent Links</h2>

      {links.length === 0 ? (
        <p className="text-gray-500">No links generated yet.</p>
      ) : (
        <table className="w-full min-w-[650px] text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Short Code</th>
              <th className="p-3">Original URL</th>
              <th className="p-3">Clicks</th>
            </tr>
          </thead>

          <tbody>
            {links.map((link) => (
              <tr key={link.id} className="border-b">
                <td className="p-3">
                  <a
                    className="text-blue-600 hover:underline"
                    href={`http://localhost:3000/${link.code}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.code}
                  </a>
                </td>

                <td className="max-w-md truncate p-3">
                  {link.originalUrl}
                </td>

                <td className="p-3">{link.clickCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LinkHistory;

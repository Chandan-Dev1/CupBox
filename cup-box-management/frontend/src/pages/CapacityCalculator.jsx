import { useEffect, useState } from "react";
import { getCups, calculateCupCapacity } from "../services/capacity.api.js";
import CapacityResult from "../components/CapacityResult.jsx";

export default function CapacityCalculator() {
  const [cups, setCups] = useState([]);
  const [cupId, setCupId] = useState("");
  const [quantity, setQuantity] = useState("70");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCups().then((data) => setCups(data.cups || [])).catch((err) => setError(err.message));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(""); setResult(null);
    try {
      const data = await calculateCupCapacity(cupId, Number(quantity));
      setResult(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="stack">
      <form className="panel form" onSubmit={handleSubmit}>
        <h1>Capacity calculator</h1>
        <p className="muted">Choose a cup and enter the number of cups to pack.</p>
        <label>Select cup
          <select value={cupId} onChange={(e) => setCupId(e.target.value)} required>
            <option value="">Choose a cup</option>
            {cups.map((cup) => <option key={cup._id} value={cup._id}>{cup.name} · {cup.diameter} cm diameter</option>)}
          </select>
        </label>
        <label>Required cups
          <input type="number" min="1" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </label>
        <button disabled={loading || cups.length === 0}>{loading ? "Calculating..." : "Calculate capacity"}</button>
        {cups.length === 0 && <p className="muted">Add a cup first from the Cups page.</p>}
        {error && <p className="error" role="alert">{error}</p>}
      </form>
      <CapacityResult result={result} />
    </div>
  );
}

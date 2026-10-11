import { useState } from "react";
import { createCup } from "../services/capacity.api.js";

const initialForm = { name: "", diameter: "", height: "", stock: "", price: "" };

export default function CupForm() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setMessage(""); setError("");
    try {
      await createCup({
        name: form.name.trim(), diameter: Number(form.diameter),
        height: Number(form.height), stock: Number(form.stock), price: Number(form.price)
      });
      setMessage("Cup created successfully.");
      setForm(initialForm);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <h2>Add a cup</h2><p className="muted">Dimensions in centimetres.</p>
      <label>Cup name<input name="name" value={form.name} onChange={handleChange} required /></label>
      <div className="two-col">
        <label>Diameter (cm)<input name="diameter" type="number" min="0.1" step="any" value={form.diameter} onChange={handleChange} required /></label>
        <label>Height (cm)<input name="height" type="number" min="0.1" step="any" value={form.height} onChange={handleChange} required /></label>
      </div>
      <div className="two-col">
        <label>Stock (cups)<input name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} required /></label>
        <label>Price per cup (₹)<input name="price" type="number" min="0" step="any" value={form.price} onChange={handleChange} required /></label>
      </div>
      <button disabled={loading}>{loading ? "Saving..." : "Save cup"}</button>
      {message && <p className="success" role="status">{message}</p>}
      {error && <p className="error" role="alert">{error}</p>}
    </form>
  );
}

import { useState } from "react";
import { createBox } from "../services/capacity.api.js";

const initialForm = { name: "", length: "", width: "", height: "", stock: "", price: "" };

export default function BoxForm() {
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
      await createBox({
        name: form.name.trim(), length: Number(form.length), width: Number(form.width),
        height: Number(form.height), stock: Number(form.stock), price: Number(form.price)
      });
      setMessage("Box created successfully.");
      setForm(initialForm);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <h2>Add a box</h2><p className="muted">Enter internal dimensions in centimetres.</p>
      <label>Box name<input name="name" value={form.name} onChange={handleChange} required /></label>
      <div className="three-col">
        <label>Length<input name="length" type="number" min="0.1" step="any" value={form.length} onChange={handleChange} required /></label>
        <label>Width<input name="width" type="number" min="0.1" step="any" value={form.width} onChange={handleChange} required /></label>
        <label>Height<input name="height" type="number" min="0.1" step="any" value={form.height} onChange={handleChange} required /></label>
      </div>
      <div className="two-col">
        <label>Stock (boxes)<input name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} required /></label>
        <label>Price per box (₹)<input name="price" type="number" min="0" step="any" value={form.price} onChange={handleChange} required /></label>
      </div>
      <button disabled={loading}>{loading ? "Saving..." : "Save box"}</button>
      {message && <p className="success" role="status">{message}</p>}
      {error && <p className="error" role="alert">{error}</p>}
    </form>
  );
}

import { Link } from "react-router";

export default function Home() {
  return (
    <main className="hero panel">
      <span className="eyebrow">PACKING WORKSPACE</span>
      <h1>Cup & Box Capacity</h1>
      <p className="muted">Manage cup sizes, box sizes, and estimate the right packaging for an order.</p>
      <div className="nav-cards">
        <Link className="nav-card" to="/cups"><strong>01 · Cups</strong><span>Add cup dimensions and stock →</span></Link>
        <Link className="nav-card" to="/boxes"><strong>02 · Boxes</strong><span>Add internal box dimensions →</span></Link>
        <Link className="nav-card" to="/capacity"><strong>03 · Calculator</strong><span>Calculate capacity and compare boxes →</span></Link>
      </div>
    </main>
  );
}

export default function CapacityResult({ result }) {
  if (!result) return null;
  return (
    <section className="panel results">
      <h2>Capacity results</h2>
      <p><strong>Cup:</strong> {result.cup.name}</p>
      <p><strong>Required quantity:</strong> {result.cup.requestedQuantity} cups</p>
      <h3>Box capacities</h3>
      {result.capacities.length === 0 ? <p>No boxes have been created yet.</p> : (
        <div className="table-wrap"><table>
          <thead><tr><th>Box</th><th>Capacity</th><th>Arrangement</th></tr></thead>
          <tbody>{result.capacities.map((box) => (
            <tr key={box.boxId}><td>{box.boxName}</td><td>{box.capacity} cups</td>
              <td>{box.arrangement ? `${box.arrangement.countX} × ${box.arrangement.countY} × ${box.arrangement.countZ}` : "Does not fit"}</td>
            </tr>
          ))}</tbody>
        </table></div>
      )}
      <h3>Recommended boxes</h3>
      {result.recommendations.length === 0 ? <p className="muted">No single box type has enough stock for the full quantity.</p> : (
        <div className="cards">{result.recommendations.map((box, index) => (
          <article className="recommendation" key={box.boxId}>
            <span className="pill">{index === 0 ? "Top recommendation" : "Alternative"}</span>
            <h4>{box.boxName}</h4><p>{box.capacity} cups per box</p>
            <p><strong>{box.requiredBoxes}</strong> boxes required</p>
            <p>{box.availableStock} boxes in stock</p>
            <p>Estimated box cost: <strong>₹{box.totalCost.toFixed(2)}</strong></p>
          </article>
        ))}</div>
      )}
    </section>
  );
}

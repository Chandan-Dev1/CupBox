const API_URL = "http://localhost:3000/api";

async function request(url, options = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const getCups = () => request("/cups");
export const createCup = (cup) => request("/cups", { method: "POST", body: JSON.stringify(cup) });
export const createBox = (box) => request("/boxes", { method: "POST", body: JSON.stringify(box) });
export const calculateCupCapacity = (cupId, quantity) =>
  request("/capacity/recommend", { method: "POST", body: JSON.stringify({ cupId, quantity }) });

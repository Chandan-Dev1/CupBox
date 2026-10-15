import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000"
});

export async function createShortLink(url) {
  const response = await api.post("/api/links", { url });
  return response.data;
}

export async function getLinks() {
  const response = await api.get("/api/links");
  return response.data;
}

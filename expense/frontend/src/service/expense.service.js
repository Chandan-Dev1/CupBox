import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/expense",
});

export const createExpense = async (data) => {
  const response = await API.post("/create", data);
  return response.data;
};

export const getExpenses = async () => {
  const response = await API.get("/get");
  return response.data;
};

export const updateExpense = async (id, data) => {
  const response = await API.patch(`/update/${id}`, data);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await API.delete(`/delete/${id}`);
  return response.data;
};
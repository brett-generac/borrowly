import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/borrows`,
  withCredentials: true
});

export const loadMyBorrows = () => api.get("/my").then((response) => response.data);

export const loadMyHistory = () => api.get("/history").then((response) => response.data);

export const createBorrow = (body) => api.post("/create", body).then((response) => response.data);

export const approveBorrow = (body) => api.patch("/approve", body).then((response) => response.data);

export const endBorrow = (body) => api.patch("/end", body).then((response) => response.data);

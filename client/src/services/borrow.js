import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/borrow`,
  withCredentials: true
});

export const loadBorrow = () => api.get("/").then((response) => response.data);

export const createBorrow = (body) => api.post(`/create`, body).then((response) => response.data);

export const endBorrow = (id, body) => api.patch(`/${id}`, body).then((response) => response.data);

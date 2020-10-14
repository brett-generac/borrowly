import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/profile`,
  withCredentials: true
});

export const loadMe = () => api.get("/me").then((response) => response.data);

export const editMe = (body) => api.patch("/me", body).then((response) => response.data);

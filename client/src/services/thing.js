import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/things`,
  withCredentials: true
});

export const loadMyThings = () => api.get("/my").then((response) => response.data);

export const loadThing = (id) => api.get(`/${id}`).then((response) => response.data);

export const loadThings = (coordinates, category) => {
  return api
    .get("/list", {
      params: {
        coordinates,
        category
      }
    })
    .then((response) => {
      return response.data;
    });
};

export const createThing = (body) => {
  const formBody = new window.FormData();
  for (let property in body) {
    formBody.append(property, body[property]);
  }
  return api.post("/create", formBody).then((response) => response.data);
};

export const editThing = (id, body) => {
  const formBody = new window.FormData();
  for (let property in body) {
    formBody.append(property, body[property]);
  }
  return api.patch(`/${id}`, body).then((response) => response.data);
};

export const deleteThing = (body) => api.post("/delete", body).then((response) => response.data);

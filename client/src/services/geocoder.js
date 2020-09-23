import axios from "axios";

const api = axios.create({
  baseURL: "https://maps.googleapis.com/"
});

export const getCoordinates = async (address) => {
  const array = address.split(" ");
  const string = array.join("+");
  const endpoint = `maps/api/geocode/json?address=${string}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  let response = await api.get(endpoint);
  return response.data;
};

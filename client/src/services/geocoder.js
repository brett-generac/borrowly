import axios from "axios";

const api = axios.create({
  baseURL: "https://maps.googleapis.com/"
});

export const getUserCoordinates = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position);
      reject("Can't get user coordinates");
    });
  });
};

export const getUserLocation = async (coordinates) => {
  const string = `${coordinates[1]},${coordinates[0]}`;
  const endpoint = `maps/api/geocode/json?latlng=${string}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const response = await api.get(endpoint);
  return response.data;
};

export const getInputCoordinates = async (address) => {
  const array = address.split(" ");
  const string = array.join("+");
  const endpoint = `maps/api/geocode/json?address=${string}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  let response = await api.get(endpoint);
  return response.data;
};

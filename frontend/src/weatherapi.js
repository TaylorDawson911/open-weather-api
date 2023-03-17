import axios from "axios";

const API_KEY = "your_api_key";
const API_URL = "https://api.openweathermap.org/data/2.5";

export const getAllCities = async () => {
  const response = await axios.get(`${API_URL}/find`, {
    params: {
      q: "",
      limit: 1000000,
      appid: API_KEY,
    },
  });

  return response.data.list;
};

export const getWeatherData = async (location = "London") => {
  const response = await axios.get(`${API_URL}/weather`, {
    params: {
      q: location,
      appid: API_KEY,
    },
  });

  return response.data;
};

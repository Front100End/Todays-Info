import axios from "axios";

export const setStocksInitData = (id) =>
  axios.get("http://localhost:5000/stock/code", {
    params: {
      id: id,
    },
  });
export const setWeatherInitData = (id) =>
  axios.get("http://localhost:5000/weather/location", {
    params: {
      id: id,
    },
  });

export const setBusInitData = (id) =>
  axios.get("http://localhost:5000/bus/route", {
    params: {
      id: id,
    },
  });

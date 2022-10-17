import axios from "axios";

export const setStocksInitData = (id) =>
  axios.get("http://3.35.237.101/stock/code", {
    params: {
      id: id,
    },
  });
export const setWeatherInitData = (id) =>
  axios.get("http://3.35.237.101/weather/location", {
    params: {
      id: id,
    },
  });

export const setBusInitData = (id) =>
  axios.get("http://3.35.237.101/bus/route", {
    params: {
      id: id,
    },
  });

import axios from "axios";

export const setStocksInitData = (id) =>
  axios.get("https://todays-info.herokuapp.com/stock/code", {
    params: {
      id: id,
    },
  });
export const setWeatherInitData = (id) =>
  axios.get("https://todays-info.herokuapp.com/weather/location", {
    params: {
      id: id,
    },
  });

export const setBusInitData = (id) =>
  axios.get("https://todays-info.herokuapp.com/bus/route", {
    params: {
      id: id,
    },
  });

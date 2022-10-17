import axios from "axios";

export const setStocksInitData = (id) =>
  axios.get("https://todays-info.herokuapp.com/api/db/stock/code", {
    params: {
      id: id,
    },
  });
export const setWeatherInitData = (id) =>
  axios.get("https://todays-info.herokuapp.com/api/db/weather/location", {
    params: {
      id: id,
    },
  });

export const setBusInitData = (id) =>
  axios.get("https://todays-info.herokuapp.com/api/db/bus/route", {
    params: {
      id: id,
    },
  });

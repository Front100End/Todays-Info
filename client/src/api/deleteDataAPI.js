import axios from "axios";

export const deleteStockDB = (id, stockCode) =>
  axios.delete("https://todays-info.herokuapp.com/api/db/stock/code", {
    data: {
      id: id,
      stockCode: stockCode,
    },
  });
export const deleteWeatherDB = (id, localName) =>
  axios.delete("https://todays-info.herokuapp.com/api/db/weather/location", {
    data: {
      id: id,
      localName: localName,
    },
  });

export const deleteBusDB = (id, stationId) =>
  axios.delete("https://todays-info.herokuapp.com/api/db/bus/route", {
    data: {
      id: id,
      stationId: stationId,
    },
  });

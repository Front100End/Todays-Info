import axios from "axios";

export const deleteStockDB = (id, stockCode) =>
  axios.delete("http://3.35.237.101/stock/code", {
    data: {
      id: id,
      stockCode: stockCode,
    },
  });
export const deleteWeatherDB = (id, localName) =>
  axios.delete("http://3.35.237.101/weather/location", {
    data: {
      id: id,
      localName: localName,
    },
  });

export const deleteBusDB = (id, stationId) =>
  axios.delete("http://3.35.237.101/bus/route", {
    data: {
      id: id,
      stationId: stationId,
    },
  });

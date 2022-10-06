import axios from "axios";

export const deleteStockDB = (id, stockCode) =>
  axios.delete("http://localhost:5000/stock/code", {
    data: {
      id: id,
      stockCode: stockCode,
    },
  });
export const deleteWeatherDB = (id, localName) =>
  axios.delete("http://localhost:5000/weather/location", {
    data: {
      id: id,
      localName: localName,
    },
  });

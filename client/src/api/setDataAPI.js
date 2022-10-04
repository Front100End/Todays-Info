import axios from "axios";

export const setStockCodeDB = (id, stockCode) =>
  axios.post("http://localhost:5000/stock/code", {
    id: id,
    stockCode: stockCode,
  });
export const setWeatherLocationDB = (id, localName, x, y) =>
  axios.post("http://localhost:5000/weather/location", {
    id: id,
    localName: localName,
    x: x,
    y: y,
  });

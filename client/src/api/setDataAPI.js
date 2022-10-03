import axios from "axios";

export const setStockCodeDB = (id, stockCode) =>
  axios.post("http://localhost:5000/stock/code", {
    id: id,
    stockCode: stockCode,
  });

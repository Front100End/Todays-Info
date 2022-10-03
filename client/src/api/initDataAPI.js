import axios from "axios";

export const setStocksInitState = (id) =>
  axios.get("http://localhost:5000/stock/code", {
    params: {
      id: id,
    },
  });

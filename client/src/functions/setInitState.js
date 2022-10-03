import axios from "axios";

export const setStocksInitState = (id) =>
  axios.get("http://localhost:5000/stock/code", {
    params: {
      id: id,
    },
  });

export const setAllInitState = async (id) => {
  let stockInitState = await setStocksInitState(id);
  console.log(stockInitState);
};

// news,stock,bus,weather 등  api request 모음

import axios from "axios";

export const getNews = () =>
  axios.get("https://todays-info.herokuapp.com/api/news");
export const getStocks = async (stockCode) => {
  let result = await axios.get("https://todays-info.herokuapp.com/api/stocks", {
    params: {
      stockCode: stockCode,
    },
  });
  return result;
};

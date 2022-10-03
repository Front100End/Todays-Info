// news,stock,bus,weather 등  api request 모음

import axios from "axios";

export const getNews = () => axios.get("http://localhost:5000/api/news");
export const getStocks = async (stockCode) => {
  let result = await axios.get("http://localhost:5000/api/stocks", {
    params: {
      stockCode: stockCode,
    },
  });
  return result;
};

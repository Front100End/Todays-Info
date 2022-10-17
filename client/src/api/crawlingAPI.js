// news,stock,bus,weather 등  api request 모음

import axios from "axios";

export const getNews = () => axios.get("http://3.35.237.101/api/news");
export const getStocks = async (stockCode) => {
  let result = await axios.get("http://3.35.237.101/api/stocks", {
    params: {
      stockCode: stockCode,
    },
  });
  return result;
};

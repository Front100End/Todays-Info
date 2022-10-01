//openAPI requeat모음

import axios from "axios";

export const stockSearchRequest = async (searchKeyword) =>
  axios.post("http://localhost:5000/api/stocks/search", {
    searchKeyword: searchKeyword,
  });
export const weatherSearchRequest = async (searchKeyword) =>
  axios.get("http://localhost:5000/api/weather/search", {
    params: {
      searchKeyword: searchKeyword,
    },
  });
export const weatherDataRequest = async (x, y) =>
  axios.post("http://localhost:5000/api/weather", {
    x: x,
    y: y,
  });

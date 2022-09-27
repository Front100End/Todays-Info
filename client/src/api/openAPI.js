//openAPI requeat모음

import axios from "axios";

export const stockRequest = async (keyword) =>
  axios.post("http://localhost:5000/api/stocks/search", {
    keyword: keyword,
  });

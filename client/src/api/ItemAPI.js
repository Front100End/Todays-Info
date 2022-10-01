// news,stock,bus,weather 등  api request 모음

import axios from "axios";
export const getNews = () => axios.get("http://localhost:5000/api/news");

//openAPI requeat모음

import axios from "axios";

export const stockSearchRequest = async (searchKeyword) =>
  axios.post("http://3.35.237.101/api/stocks/search", {
    searchKeyword: searchKeyword,
  });
export const busStationSearchRequest = async (searchKeyword) =>
  axios.get("http://3.35.237.101/api/bus/search/station", {
    params: {
      searchKeyword: searchKeyword,
    },
  });
export const busRouteSearchRequest = async (stationId) =>
  axios.get("http://3.35.237.101/api/bus/search/route", {
    params: {
      stationId: stationId,
    },
  });
export const busDataRequest = async (stationId, routeId, staOrder) =>
  axios.get("http://3.35.237.101/api/bus", {
    params: {
      stationId: stationId,
      routeId: routeId,
      staOrder: staOrder,
    },
  });

export const weatherSearchRequest = async (searchKeyword) =>
  axios.get("http://3.35.237.101/api/weather/search", {
    params: {
      searchKeyword: searchKeyword,
    },
  });
export const weatherDataRequest = async (x, y) =>
  axios.post("http://3.35.237.101/api/weather", {
    x: x,
    y: y,
  });

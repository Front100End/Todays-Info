import axios from "axios";

export const setStockCodeDB = (id, stockCode) =>
  axios.post("http://3.35.237.101/stock/code", {
    id: id,
    stockCode: stockCode,
  });
export const setWeatherLocationDB = (id, localName, x, y) =>
  axios.post("http://3.35.237.101/weather/location", {
    id: id,
    localName: localName,
    x: x,
    y: y,
  });
export const setbusRouteDB = (
  id,
  stationId,
  routeId,
  staOrder,
  routeType,
  routeName
) =>
  axios.post("http://3.35.237.101/bus/route", {
    id: id,
    stationId: stationId,
    routeId: routeId,
    staOrder: staOrder,
    routeType: routeType,
    routeName: routeName,
  });

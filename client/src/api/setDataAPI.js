import axios from "axios";

export const setStockCodeDB = (id, stockCode) =>
  axios.post("https://todays-info.site/api/db/stock/code", {
    id: id,
    stockCode: stockCode,
  });
export const setWeatherLocationDB = (id, localName, x, y) =>
  axios.post("https://todays-info.site/api/db/weather/location", {
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
  axios.post("https://todays-info.site/api/db/bus/route", {
    id: id,
    stationId: stationId,
    routeId: routeId,
    staOrder: staOrder,
    routeType: routeType,
    routeName: routeName,
  });

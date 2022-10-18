import axios from "axios";

export const deleteStockDB = (id, stockCode) =>
  axios.delete("https://todays-info.site/api/db/stock/code", {
    data: {
      id: id,
      stockCode: stockCode,
    },
  });
export const deleteWeatherDB = (id, localName) =>
  axios.delete("https://todays-info.site/api/db/weather/location", {
    data: {
      id: id,
      localName: localName,
    },
  });

export const deleteBusDB = (id, routeId) =>
  axios.delete("https://todays-info.site/api/db/bus/route", {
    data: {
      id: id,
      routeId: routeId,
    },
  });

import * as deleteApi from "../api/deleteDataAPI";
import { deleteStock } from "../modules/stockReducer";
import { deleteWeather } from "../modules/weatherReducer";
import { deleteBus } from "../modules/busReducer";

export const deleteStockData = async (id, stockCode, dispatch) => {
  let deleteRes = await deleteApi.deleteStockDB(id, stockCode);
  if (deleteRes.data.deleteStockCodeSuccess === true) {
    dispatch(deleteStock(stockCode));
  } else {
    return;
  }
};

export const deleteWeatherData = async (id, localName, dispatch) => {
  let deleteRes = await deleteApi.deleteWeatherDB(id, localName);
  if (deleteRes.data.deleteWeatherLocationSuccess === true) {
    dispatch(deleteWeather(localName));
  } else {
    return;
  }
};

export const deleteBusData = async (id, stationId, dispatch) => {
  let deleteRes = await deleteApi.deleteBusDB(id, stationId);
  console.log(deleteRes.data);
  if (deleteRes.data.deleteBusRouteSuccess === true) {
    dispatch(deleteBus(stationId));
  } else {
    return;
  }
};

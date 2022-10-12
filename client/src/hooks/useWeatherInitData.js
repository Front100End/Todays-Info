import { useState, useEffect } from "react";
import axios from "axios";
import { setUser } from "../modules/userReducer";
import { useSelector, useDispatch } from "react-redux";
import * as initApi from "../api/initDataAPI";
import * as openApi from "../api/openAPI";
import { setWeatherData, resetWeatherData } from "../modules/weatherReducer";
const useWeatherInitData = (loadingFunc) => {
  const User = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();
  const getWeatherInitData = async (loadingFunc) => {
    try {
      let weatherInitData = await initApi.setWeatherInitData(User[0].id);
      dispatch(resetWeatherData());
      weatherInitData.data.forEach(async (current) => {
        let weatherRes = await openApi.weatherDataRequest(current.x, current.y);
        weatherRes.data.localName = current.localName;
        let weatherArray = [weatherRes.data];
        dispatch(setWeatherData(weatherArray)); //종목코드 크롤링 결과 dispatch
      });
      loadingFunc(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getWeatherInitData(loadingFunc);
  }, []);
};

export default useWeatherInitData;

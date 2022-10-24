import React, { useState } from "react";
import styles from "./WeatherModal.module.scss";
import * as openApi from "../../../api/openAPI";
import * as setApi from "../../../api/setDataAPI";
import { weatherRequestParams } from "../../../functions/Times";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherData } from "../../../modules/weatherReducer";
const WeatherModal = (props) => {
  const [searchKeyword, setSearchKeyword] = useState();
  const [Location, setLocation] = useState([]);
  const requestTime = weatherRequestParams();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.userReducer.currentUser);

  const locationSearch = async (e, locationName) => {
    e.preventDefault();
    try {
      let location = await openApi.weatherSearchRequest(locationName);
      setLocation(location.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getWeatherData = async (id, localName, x, y) => {
    const roundedX = Math.round(x * 1000) / 1000;
    const roundedY = Math.round(y * 1000) / 1000;
    try {
      let res = await openApi.weatherDataRequest(roundedX, roundedY);
      let weatherData = res.data;
      weatherData.localName = localName;
      dispatch(setWeatherData(weatherData));
      let location = await setApi.setWeatherLocationDB(
        id,
        localName,
        roundedX,
        roundedY
      );
      props.modalStateToggle();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.WeatherModal}>
      <ul>
        <li>
          <h4 onClick={() => weatherRequestParams()}>위치검색</h4>
        </li>
        <li>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                locationSearch(e, searchKeyword);
              }
            }}
          >
            <input
              type="text"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={(e) => locationSearch(e, searchKeyword)}>
              검색
            </button>
          </form>
        </li>
        <li>
          {Location.length !== 0 ? (
            <ul>
              {Location ? (
                Location.map((current, index) => {
                  return (
                    <li key={index}>
                      <button
                        onClick={(e) => {
                          getWeatherData(
                            User[0].id,
                            current.roadAddress,
                            current.x,
                            current.y
                          );
                        }}
                      >
                        {current.roadAddress}
                      </button>
                    </li>
                  );
                })
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </ul>
          ) : (
            <p>※ 지역명을 정확히 입력해주세요.</p>
          )}
        </li>
      </ul>
    </div>
  );
};

export default WeatherModal;

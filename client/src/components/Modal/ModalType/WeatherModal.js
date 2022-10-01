import React, { useState } from "react";
import styles from "./WeatherModal.module.scss";
import * as api from "../../../api/openAPI";
import { WeatherRequestParams } from "../../../functions/Times";
const WeatherModal = (props) => {
  const [searchKeyword, setSearchKeyword] = useState();
  const [Location, setLocation] = useState([]);
  const [weather, setWeatherData] = useState([]);

  const locationSearch = async (e, locationName) => {
    e.preventDefault();
    try {
      let location = await api.weatherSearchRequest(locationName);
      setLocation(location.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getWeatherData = async (x, y) => {
    try {
      let weatherData = await api.weatherDataRequest(x, y);
      console.log(weatherData.data.item);
      setWeatherData(weatherData.data.item);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.WeatherModal}>
      <ul>
        <li>
          <h4 onClick={() => WeatherRequestParams()}>위치검색</h4>
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
                        onClick={() => {
                          getWeatherData(current.x, current.y);
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

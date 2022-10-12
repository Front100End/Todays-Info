import styles from "./CreateWeathers.module.scss";
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWeatherData } from "../../functions/deleteItems";
import { resetWeatherData, setWeatherData } from "../../modules/weatherReducer";
import * as initApi from "../../api/initDataAPI";
import * as openApi from "../../api/openAPI";
import weatherImage from "../../images/ico_weather.png";
import refreshIcon from "../../images/refresh_icon.png";

const CreateWeathers = (props) => {
  const [loading, setLoading] = useState(true);
  const [weatherArray, setWeatherArray] = useState([]);
  const weatherData = useSelector((state) => state.weatherReducer.weatherData);
  const User = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();

  const refreshWeatherItem = async () => {
    setLoading(true);
    try {
      let weatherInitData = await initApi.setWeatherInitData(User[0].id);
      dispatch(resetWeatherData());
      weatherInitData.data.forEach(async (current) => {
        let weatherRes = await openApi.weatherDataRequest(current.x, current.y);
        weatherRes.data.localName = current.localName;
        let weatherArray = [weatherRes.data];
        dispatch(setWeatherData(weatherArray)); //종목코드 크롤링 결과 dispatch
      });
      setLoading(false);
    } catch (err) {
      console.log(`err : front ${err}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    setWeatherArray(weatherData);
    setLoading(false);
  }, [weatherData]);
  return (
    <ul className={styles.CreateWeathers}>
      <li>
        <div>
          <img src={weatherImage} alt="weatherIconImage error" />
          <h2>날씨</h2>
        </div>
        <button onClick={() => refreshWeatherItem()}>
          <img src={refreshIcon} alt="arrows-rotate-solid img problem" />
        </button>
      </li>

      {loading === true
        ? ""
        : weatherArray.map((item, index) => {
            return (
              <li key={index} className={styles.weatherItem}>
                <header>
                  <h2>{item.localName}</h2>
                  <h3>{item.current.weather[0].main}</h3>
                  <button
                    className={styles.deleteButton}
                    onClick={() =>
                      deleteWeatherData(User[0].id, item.localName, dispatch)
                    }
                  >
                    X
                  </button>
                </header>
                <section>
                  <CurrentWeather weatherData={item}></CurrentWeather>
                </section>
                <footer>
                  <HourlyWeather
                    hourlyWeatherData={item.hourly}
                  ></HourlyWeather>
                </footer>
              </li>
            );
          })}
    </ul>
  );
};

export default CreateWeathers;

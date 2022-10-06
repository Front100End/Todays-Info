import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateWeathers.module.scss";
import weatherImage from "../../images/ico_weather.png";
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";
import { deleteWeatherData } from "../../functions/deleteItems";
const CreateWeathers = (props) => {
  const [loading, setLoading] = useState(true);
  const [weatherArray, setWeatherArray] = useState([]);
  const weatherData = useSelector((state) => state.weatherReducer.weatherData);
  const User = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    setWeatherArray(weatherData);
    setLoading(false);
  }, [weatherData]);
  return (
    <ul className={styles.CreateWeathers}>
      <li>
        <img src={weatherImage} alt="weatherIconImage error" />
        <h2>날씨</h2>
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

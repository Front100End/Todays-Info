import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreateWeathers.module.scss";
import weatherImage from "../../images/ico_weather.png";

const CreateWeathers = (props) => {
  const [loading, setLoading] = useState(true);
  const [weatherArray, setWeatherArray] = useState([]);
  const weatherData = useSelector((state) => state.weatherReducer.weatherData);

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
                <p>{item.current.temp}</p>
              </li>
            );
          })}
    </ul>
  );
};

export default CreateWeathers;

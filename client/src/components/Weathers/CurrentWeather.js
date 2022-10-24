import React, { useState, useEffect } from "react";
import { tempConverter } from "../../functions/unitConverter";
import { weatherIconConverterMain } from "../../functions/weatherIconConverter";
import styles from "./CreateWeathers.module.scss";

const CurrentWeather = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState([]);
  useEffect(() => {
    setLoading(true);
    setCurrentWeather(props.weatherData);
    setLoading(false);
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        ""
      ) : (
        <div className={styles.currentWeather}>
          <img
            src={weatherIconConverterMain(
              currentWeather.current.weather[0].main,
              currentWeather.current.weather[0].description
            )}
            alt="weatherMainIcon error"
          />
          <div>
            <h4>{`${tempConverter(currentWeather.current.temp)}º`}</h4>
            <p>{`최고 ${tempConverter(
              currentWeather.daily[0].temp.max
            )}º / 최저 ${tempConverter(currentWeather.daily[0].temp.min)}º`}</p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CurrentWeather;

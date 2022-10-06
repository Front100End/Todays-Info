import React, { useState, useEffect } from "react";
import { tempConverter } from "../../functions/unitConverter";
import { weatherIconConverterHour } from "../../functions/weatherIconConverter";
import { weatherHourTime } from "../../functions/Times";
import { weatherRainConverter } from "../../functions/weatherRainConverter";
import styles from "./CreateWeathers.module.scss";

const HourlyWeather = (props) => {
  const [loading, setLoading] = useState(true);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  useEffect(() => {
    setLoading(true);
    let hourly = props.hourlyWeatherData.slice(3, 12);
    setHourlyWeather(hourly);
    setLoading(false);
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        ""
      ) : (
        <React.Fragment>
          <ul className={styles.hourWeatherWrap}>
            {hourlyWeather.map((current, index) => {
              return (
                <li key={index}>
                  <span>{weatherHourTime(current.dt)}</span>
                  <img
                    src={weatherIconConverterHour(
                      current.weather[0].main,
                      current.weather[0].description
                    )}
                    alt="weatherHourIcon error"
                  />
                  <em>{`${tempConverter(current.temp)}º`}</em>
                  <span>{`${weatherRainConverter(current.pop)}%`}</span>
                </li>
              );
            })}
          </ul>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HourlyWeather;

import brokenCloudsMain from "../images/weatherIcon/brokenClouds_background.png";
import cloudsMain from "../images/weatherIcon/clouds_background.png";
import clearMain from "../images/weatherIcon/clear_background.png";
import fewCloudsMain from "../images/weatherIcon/fewClouds_background.png";
import rainMain from "../images/weatherIcon/rain_background.png";
import snowMain from "../images/weatherIcon/snow_background.png";
import thunderMain from "../images/weatherIcon/thunder_background.png";
import thunderRainMain from "../images/weatherIcon/thunderRain_background.png";
import brokenCloudsHour from "../images/weatherIcon/brokenClouds.png";
import cloudsHour from "../images/weatherIcon/clouds.png";
import clearHour from "../images/weatherIcon/clear.png";
import fewCloudsHour from "../images/weatherIcon/fewClouds.png";
import rainHour from "../images/weatherIcon/rain.png";
import snowHour from "../images/weatherIcon/snow.png";
import thunderHour from "../images/weatherIcon/thunder.png";
import thunderRainHour from "../images/weatherIcon/thunderRain.png";

export const weatherIconConverterMain = (weather, description) => {
  switch (weather) {
    case "Clear":
      return clearMain;
    case "Clouds":
      if (description === "few clouds") {
        return fewCloudsMain;
      } else if (description === "broken clouds") {
        return brokenCloudsMain;
      }
      return cloudsMain;
    case "Rain":
      return rainMain;
    case "Snow":
      return snowMain;
    case "Thunderstorm":
      if (description.indexOf("rain") !== -1) {
        return thunderRainMain;
      }
      return thunderMain;
    default:
      return cloudsMain;
  }
};

export const weatherIconConverterHour = (weather, description) => {
  switch (weather) {
    case "Clear":
      return clearHour;
    case "Clouds":
      if (description === "few clouds") {
        return fewCloudsHour;
      } else if (description === "broken clouds") {
        return brokenCloudsHour;
      }
      return cloudsHour;
    case "Rain":
      return rainHour;
    case "Snow":
      return snowHour;
    case "Thunderstorm":
      if (description.indexOf("rain") !== -1) {
        return thunderRainHour;
      }
      return thunderHour;
    default:
      return cloudsHour;
  }
};

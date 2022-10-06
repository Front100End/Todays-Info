const WeatherData = "weatherData";
const DeleteWeatherData = "deleteWeatherData";
export const setWeatherData = (data) => ({
  type: WeatherData,
  data: data,
});
export const deleteWeather = (data) => ({
  type: DeleteWeatherData,
  data: data,
});
const initState = {
  weatherData: [],
};
export default function weatherReducer(state = initState, action) {
  switch (action.type) {
    case WeatherData: {
      return {
        ...state,
        weatherData: state.weatherData.concat(action.data),
      };
    }
    case DeleteWeatherData: {
      return {
        ...state,
        weatherData: state.weatherData.filter(
          (current) => current.localName !== action.data
        ),
      };
    }
    default:
      return state;
  }
}

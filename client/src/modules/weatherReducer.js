const WeatherData = "weatherData";

export const setWeatherData = (data) => ({
  type: WeatherData,
  data: data,
});

const initState = {
  weatherData: [],
};
export default function weatherReducer(state = initState, action) {
  switch (action.type) {
    case WeatherData: {
      console.log(action.data);
      return {
        ...state,
        weatherData: state.weatherData.concat(action.data),
      };
    }

    default:
      return state;
  }
}

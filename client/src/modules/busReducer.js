const BusData = "busData";
const ResetBusData = "resetBusData";
const DeleteBusData = "deleteWeatherData";
export const setBusData = (data) => ({
  type: BusData,
  data: data,
});
export const resetBusData = (data) => ({
  type: ResetBusData,
  data: data,
});
export const deleteBus = (data) => ({
  type: DeleteBusData,
  data: data,
});
const initState = {
  busData: [],
};
export default function busReducer(state = initState, action) {
  switch (action.type) {
    case BusData: {
      return {
        ...state,
        busData: state.busData.concat(action.data),
      };
    }
    case ResetBusData: {
      return {
        busData: [],
      };
    }
    case DeleteBusData: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}

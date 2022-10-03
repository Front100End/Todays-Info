const StockData = "StockData";
const StockCode = "StockCode";

export const setStockData = (data) => ({
  type: StockData,
  data: data,
});
export const setStockCode = (data) => ({
  type: StockCode,
  data: data,
});

const initState = {
  stockData: [],
  stockCode: [],
};
export default function weatherReducer(state = initState, action) {
  switch (action.type) {
    case StockData: {
      return {
        ...state,
        stockData: state.stockData.concat(action.data),
      };
    }
    case StockCode: {
      return {
        ...state,
        stockCode: state.stockCode.concat(action.data),
      };
    }

    default:
      return state;
  }
}

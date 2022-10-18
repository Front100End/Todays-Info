const StockData = "stockData";
const DeleteStockData = "deleteStockData";
const ResetStockData = "resetStockData";
export const setStockData = (data) => ({
  type: StockData,
  data: data,
});
export const deleteStock = (data) => ({
  type: DeleteStockData,
  data: data,
});
export const resetStockData = (data) => ({
  type: ResetStockData,
  data: data,
});

const initState = {
  stockData: [],
};
export default function weatherReducer(state = initState, action) {
  switch (action.type) {
    case StockData: {
      return {
        ...state,
        stockData: state.stockData.concat(action.data),
      };
    }
    case DeleteStockData: {
      return {
        ...state,
        stockData: state.stockData.filter(
          (current) => current[4].code !== action.data
        ),
      };
    }
    case ResetStockData: {
      return {
        stockData: [],
      };
    }

    default:
      return state;
  }
}

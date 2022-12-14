import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as initApi from "../api/initDataAPI";
import * as crawlingApi from "../api/crawlingAPI";
import { setStockData, resetStockData } from "../modules/stockReducer";
const useStockInitData = (loadingFunc) => {
  const User = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();

  const getStockInitData = async (loadingFunc) => {
    try {
      let StockInitData = await initApi.setStocksInitData(User[0].id);
      dispatch(resetStockData());
      StockInitData.data.forEach(async (current) => {
        let crawlingData = await crawlingApi.getStocks(current.stockcode);
        let DataArray = [crawlingData.data];
        dispatch(setStockData(DataArray)); //종목코드 크롤링 결과 dispatch
      });
      loadingFunc(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getStockInitData(loadingFunc);
  }, []);
};

export default useStockInitData;

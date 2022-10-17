import React, { useState, useEffect } from "react";
import styles from "./CreateStocks.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { stockFooterTime } from "../../functions/Times";
import { deleteStockData } from "../../functions/deleteItems";
import stockImage from "../../images/ico_stock.png";
import upIcon from "../../images/up_icon.png";
import downIcon from "../../images/down_icon.png";
import refreshIcon from "../../images/refresh_icon.png";
import * as initApi from "../../api/initDataAPI";
import * as crawlingApi from "../../api/crawlingAPI";
import { resetStockData, setStockData } from "../../modules/stockReducer";
const CreateStocks = (props) => {
  const [loading, setLoading] = useState(true);
  const [stockArray, setStockArray] = useState([]);
  const stockData = useSelector((state) => state.stockReducer.stockData);
  const User = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();
  const refreshStockItem = async () => {
    setLoading(true);
    try {
      let StockInitData = await initApi.setStocksInitData(User[0].id);
      dispatch(resetStockData());
      StockInitData.data.forEach(async (current) => {
        let crawlingData = await crawlingApi.getStocks(current.stockcode);
        let DataArray = [crawlingData.data];
        dispatch(setStockData(DataArray)); //종목코드 크롤링 결과 dispatch
      });
      setLoading(false);
    } catch (err) {
      console.log(`err : front ${err}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    setStockArray(stockData);
    setLoading(false);
  }, [stockData]);

  return (
    <ul className={styles.CreateStocks}>
      <li>
        <div>
          <img src={stockImage} alt="" />
          <h2>주식</h2>
        </div>
        <button onClick={() => refreshStockItem()}>
          <img src={refreshIcon} alt="arrows-rotate-solid img problem" />
        </button>
      </li>
      {loading === true
        ? ""
        : stockArray.map((current, index) => {
            return (
              <li key={index} className={styles.stockItem}>
                <h3>
                  <p>{current[3].stockName}</p>
                  <button
                    className={styles.itemDeleteButton}
                    onClick={() =>
                      deleteStockData(User[0].id, current[4].code, dispatch)
                    }
                  >
                    X
                  </button>
                </h3>
                <p>
                  <em>{current[0].price}</em>
                  {current[1].priceState === "상승" ? (
                    <img src={upIcon} alt="up_Icon error" />
                  ) : (
                    <img src={downIcon} alt="downIcon error" />
                  )}
                  <span
                    style={
                      current[1].priceState === "상승"
                        ? { color: "red" }
                        : { color: "blue" }
                    }
                  >
                    {current[1].comparePrice}
                  </span>
                  <span
                    style={
                      current[1].priceState === "상승"
                        ? { color: "red" }
                        : { color: "blue" }
                    }
                  >
                    {current[1].priceState === "상승"
                      ? `+${current[2].comparePrice}%`
                      : `-${current[2].comparePrice}%`}
                  </span>
                </p>
                <time>{stockFooterTime()}</time>
              </li>
            );
          })}
    </ul>
  );
};

export default CreateStocks;

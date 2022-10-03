import React, { useState, useEffect } from "react";
import styles from "./CreateStocks.module.scss";
import { useSelector } from "react-redux";
import { stockFooterTime } from "../../functions/Times";
import stockImage from "../../images/ico_stock.png";
import upIcon from "../../images/up_icon.png";
import downIcon from "../../images/down_icon.png";

const CreateStocks = (props) => {
  const [loading, setLoading] = useState(true);

  const [stockArray, setStockArray] = useState([]);
  const stockCode = useSelector((state) => state.stockReducer.stockCode);
  const stockData = useSelector((state) => state.stockReducer.stockData);

  useEffect(() => {
    setLoading(true);
    setStockArray(stockData);
    setLoading(false);
  }, [stockData]);

  return (
    <ul className={styles.CreateStocks}>
      {loading
        ? ""
        : stockArray.map((current, index) => {
            return (
              <li key={index}>
                <h3>
                  <img src={stockImage} alt="stock Image error" />
                  <p>{stockCode[index].stockName}</p>
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

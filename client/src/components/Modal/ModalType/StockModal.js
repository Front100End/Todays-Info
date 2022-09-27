import React, { useState } from "react";
import styles from "./StockModal.module.scss";
import * as api from "../../../api/openAPI";

const StockModal = (props) => {
  const [stockName, setStockName] = useState("");
  const stockCodeSearch = async (e, stockName) => {
    e.preventDefault();
    let searchResult = await api.stockRequest(stockName);
    console.log(searchResult);
  };
  return (
    <div className={styles.StockModal}>
      <ul>
        <li>
          <h4>종목코드검색</h4>
        </li>
        <li>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                stockCodeSearch(e, stockName);
              }
            }}
          >
            <input type="text" onChange={(e) => setStockName(e.target.value)} />
            <button onClick={(e) => stockCodeSearch(e, stockName)}>검색</button>
          </form>
        </li>
        <li>
          <div></div>
        </li>
      </ul>
    </div>
  );
};

export default StockModal;

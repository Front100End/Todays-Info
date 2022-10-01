import React, { useState } from "react";
import styles from "./StockModal.module.scss";
import * as api from "../../../api/openAPI";

const StockModal = (props) => {
  const [stockName, setStockName] = useState("");
  const [stockStorage, setStockStorage] = useState([]);
  const stockCodeSearch = async (e, stockName) => {
    e.preventDefault();
    let searchResult = await api.stockSearchRequest(stockName);
    let arraySearchResult = [];
    if (searchResult.data.length === undefined) {
      arraySearchResult = [searchResult.data];
    } else {
      arraySearchResult = searchResult.data;
    }
    setStockStorage(arraySearchResult);
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
          {stockStorage.length !== 0 ? (
            <ul>
              {stockStorage ? (
                stockStorage.map((current, index) => {
                  return (
                    <li key={index}>
                      <button>
                        {current.korSecnNm.length < 10
                          ? current.korSecnNm
                          : current.korSecnNm.slice(0, 10)}

                        {current.engSecnNm.length < 10
                          ? `(${current.engSecnNm})`
                          : `(${current.engSecnNm.slice(0, 10) + "..."})`}
                      </button>
                    </li>
                  );
                })
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </ul>
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
};

export default StockModal;

import React, { useEffect, useState } from "react";
import styles from "./StockModal.module.scss";
import * as openApi from "../../../api/openAPI";
import * as setApi from "../../../api/setDataAPI";
import * as crawlingApi from "../../../api/crawlingAPI";
import { useDispatch, useSelector } from "react-redux";
import { setStockData } from "../../../modules/stockReducer";

const StockModal = (props) => {
  const [stockName, setStockName] = useState("");
  const [stockStorage, setStockStorage] = useState([]);
  const [stockSearchLoading, setStockSearchLoading] = useState(true);
  const [guide, setGuide] = useState("종목명을 입력해주세요.");
  const dispatch = useDispatch();
  const User = useSelector((state) => state.userReducer.currentUser);

  const stockCodeSearch = async (e, stockName) => {
    e.preventDefault();
    setStockSearchLoading(true);

    let searchResult = await openApi.stockSearchRequest(stockName); //공공데이터 API를 이용해 종목코드 검색
    if (searchResult.data.isSuccess === false) {
      setGuide("검색 결과가 없습니다.");
      return;
    }
    setStockStorage(searchResult.data);
    setStockSearchLoading(false);
  };

  const setStockItem = async (id, stockCode, stockName) => {
    // const StockData = {
    //   stockCode: stockCode,
    //   stockName: stockName,
    // };
    // dispatch(setStockCode(StockData)); //종목코드 dispatch

    let crawlingData = await crawlingApi.getStocks(stockCode);
    let crawlingArray = [crawlingData.data];
    dispatch(setStockData(crawlingArray)); //종목코드 크롤링 결과 dispatch
    let stockCodeData = await setApi.setStockCodeDB(id, stockCode); //종목코드 DB저장
    props.modalStateToggle();
  };

  useEffect(() => {}, [stockStorage]);

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
          <ul>
            {stockSearchLoading === false ? (
              stockStorage.map((current, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={() =>
                        setStockItem(
                          User[0].id,
                          current.shotnIsin,
                          current.korSecnNm
                        )
                      }
                    >
                      {current.korSecnNm.length < 10
                        ? current.korSecnNm
                        : current.korSecnNm.slice(0, 10)}

                      {current.engSecnNm
                        ? current.engSecnNm.length < 10
                          ? `(${current.engSecnNm})`
                          : `(${current.engSecnNm.slice(0, 10) + "..."})`
                        : ""}
                    </button>
                  </li>
                );
              })
            ) : (
              <li>
                <p>{guide}</p>
              </li>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default StockModal;

import React, { useState } from "react";
import styles from "../Home/SectionChange/ChangeBox/FirstChange.module.scss";
import { FirstSubBox, SecondSubBox } from "../../styles/Item";
import CreateStocks from "./CreateStocks";
import useStockInitData from "../../hooks/useStockInitData";

const Stocks = (props) => {
  const [loading, setLoading] = useState(true);
  const loadingToggle = () => {
    setLoading((current) => !current);
  };
  useStockInitData(loadingToggle);

  const SubItem = {
    1: (
      <FirstSubBox className={styles.Stock}>
        <CreateStocks></CreateStocks>
      </FirstSubBox>
    ),
    2: (
      <SecondSubBox className={styles.Stock}>
        <CreateStocks></CreateStocks>
      </SecondSubBox>
    ),
  };

  return (
    <React.Fragment>
      {loading ? "" : <div>{SubItem[props.menuState]}</div>}
    </React.Fragment>
  );
};

export default Stocks;

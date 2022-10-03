import React from "react";
import styles from "../Home/SectionChange/ChangeBox/FirstChange.module.scss";
import { FirstSubBox, SecondSubBox } from "../../styles/Item";
import CreateStocks from "./CreateStocks";

const Stocks = (props) => {
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
      <div>{SubItem[props.menuState]}</div>
    </React.Fragment>
  );
};

export default Stocks;

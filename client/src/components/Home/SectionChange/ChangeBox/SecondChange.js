import React from "react";
import styles from "./SecondChange.module.scss";
import News from "../../../News/News";
import Weathers from "../../../Weathers/Weathers";
import Buses from "../../../Buses/Buses";
import Stocks from "../../../Stocks/Stocks";

const SecondChange = (props) => {
  return (
    <section className={styles.gridArea}>
      <div className={styles.gridFirstItem}>
        <News menuState={props.menuState}></News>
      </div>
      <div className={styles.gridSecondItem}>
        <Weathers menuState={props.menuState}></Weathers>
        <Buses menuState={props.menuState}></Buses>
        <Stocks menuState={props.menuState}></Stocks>
      </div>
    </section>
  );
};

export default SecondChange;

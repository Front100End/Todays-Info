import React from "react";
import styles from "../Home/SectionChange/ChangeBox/FirstChange.module.scss";
import Item from "../item";
import { FirstSubBox, SecondSubBox } from "../../styles/Item";
import CreateBuses from "./CreateBuses";
const Buses = (props) => {
  const SubItem = {
    1: (
      <FirstSubBox className={styles.Stock}>
        <CreateBuses></CreateBuses>
      </FirstSubBox>
    ),
    2: (
      <SecondSubBox className={styles.Stock}>
        <CreateBuses></CreateBuses>
      </SecondSubBox>
    ),
  };

  return <div>{SubItem[props.menuState]}</div>;
};

export default Buses;

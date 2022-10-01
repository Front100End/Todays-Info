import React from "react";
import styles from "../Home/SectionChange/ChangeBox/FirstChange.module.scss";
import Item from "../item";
import { FirstSubBox, SecondSubBox } from "../../styles/Item";

const Buses = (props) => {
  const SubItem = {
    1: (
      <FirstSubBox
        className={styles.Stock}
        style={{ border: "5px solid blue" }}
      >
        <Item></Item>
      </FirstSubBox>
    ),
    2: (
      <SecondSubBox
        className={styles.Stock}
        style={{ border: "5px solid blue" }}
      >
        <Item></Item>
      </SecondSubBox>
    ),
  };

  return <div>{SubItem[props.menuState]}</div>;
};

export default Buses;

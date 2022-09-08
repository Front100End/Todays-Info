import React from "react";
import styles from "../Home/SectionChange/ChangeBox/FirstChange.module.scss";
import Item from "../item";
import { FirstSubBox, SecondSubBox } from "../../styles/Item";

const Weathers = (props) => {
  const SubItem = {
    1: (
      <FirstSubBox
        className={styles.Weather}
        style={{ border: "5px solid green" }}
      >
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
      </FirstSubBox>
    ),
    2: (
      <SecondSubBox
        className={styles.Weather}
        style={{ border: "5px solid green" }}
      >
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
      </SecondSubBox>
    ),
  };

  return <div>{SubItem[props.menuState]}</div>;
};

export default Weathers;

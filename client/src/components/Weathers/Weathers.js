import React from "react";
import styles from "../Home/SectionChange/ChangeBox/FirstChange.module.scss";
import Item from "../item";
import { FirstSubBox, SecondSubBox } from "../../styles/Item";
import CreateWeathers from "./CreateWeathers";
const Weathers = (props) => {
  const SubItem = {
    1: (
      <FirstSubBox className={styles.Weather}>
        <CreateWeathers></CreateWeathers>
      </FirstSubBox>
    ),
    2: (
      <SecondSubBox className={styles.Weather}>
        <CreateWeathers></CreateWeathers>
      </SecondSubBox>
    ),
  };

  return <div>{SubItem[props.menuState]}</div>;
};

export default Weathers;

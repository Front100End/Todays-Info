import React from "react";
import styles from "../Home/SectionChange/ChangeBox/FirstChange.module.scss";
import CreateNews from "./CreateNews";
import { FirstMainBox, SecondMainBox } from "../../styles/Item";

const News = (props) => {
  const NewsItem = {
    1: (
      <FirstMainBox className={styles.News}>
        <CreateNews></CreateNews>
      </FirstMainBox>
    ),
    2: (
      <SecondMainBox className={styles.News}>
        <CreateNews></CreateNews>
      </SecondMainBox>
    ),
  };
  return <div style={{ height: `100%` }}>{NewsItem[props.menuState]}</div>;
};

export default News;

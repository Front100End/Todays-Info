import React, { useEffect } from "react";
import styles from "../Home/SectionChange/ChangeBox/FirstChange.module.scss";
import Item from "../item";
import LongItem from "../LongItem";
import { FirstMainBox, SecondMainBox } from "../../styles/Item";

const News = (props) => {
  const NewsItem = {
    1: (
      <FirstMainBox
        className={styles.News}
        style={{ border: "5px solid gray" }}
      >
        <div style={{ height: "100%", padding: "30px" }}>This is News</div>
      </FirstMainBox>
    ),
    2: (
      <SecondMainBox
        className={styles.News}
        style={{ border: "5px solid gray" }}
      >
        <LongItem></LongItem>
        <LongItem></LongItem>
        <LongItem></LongItem>
        <LongItem></LongItem>
        <LongItem></LongItem>
      </SecondMainBox>
    ),
  };
  return <div style={{ height: `100%` }}>{NewsItem[props.menuState]}</div>;
};

export default News;

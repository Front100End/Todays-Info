import React, { useEffect } from "react";
import styles from "../Home/SectionChange/ChangeBox/FirstChange.module.scss";
import Item from "../item";
import LongItem from "../LongItem";
import CreateNews from "./CreateNews";
import { FirstMainBox, SecondMainBox } from "../../styles/Item";

const News = (props) => {
  const NewsItem = {
    1: (
      <FirstMainBox
        className={styles.News}
        style={{ border: "5px solid gray" }}
      >
        <CreateNews></CreateNews>
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
        <CreateNews></CreateNews>
      </SecondMainBox>
    ),
  };
  return <div style={{ height: `100%` }}>{NewsItem[props.menuState]}</div>;
};

export default News;

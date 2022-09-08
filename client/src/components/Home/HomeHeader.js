import React, { useState, useEffect } from "react";
import styles from "./HomeHeader.module.scss";
import plusImage from "../../images/circle-plus-solid.svg";
import { MediumIcon } from "../../styles/Icons";
import { HomeHeaderTime } from "../../functions/Times";
const HomeHeader = (props) => {
  const [headerTime, setHeaderTime] = useState();
  useEffect(() => {
    setHeaderTime(HomeHeaderTime());
  }, []);
  return (
    <header className={styles.HomeHeader}>
      <ul>
        <li>
          <h1>Sseong's</h1>
        </li>
        <li>
          <MediumIcon src={plusImage}></MediumIcon>
        </li>
      </ul>
      <div className={styles.todayInform}>
        <p>오늘의 정보</p>
        <p>{headerTime}</p>
      </div>
    </header>
  );
};

export default HomeHeader;

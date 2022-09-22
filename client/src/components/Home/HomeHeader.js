import React, { useState, useEffect, useRef } from "react";
import styles from "./HomeHeader.module.scss";
import plusImage from "../../images/circle-plus-solid.svg";
import { MediumIcon } from "../../styles/Icons";
import { HomeHeaderTime } from "../../functions/Times";
const HomeHeader = (props) => {
  const [headerTime, setHeaderTime] = useState();
  const [plusState, setPlusState] = useState(false);
  useEffect(() => {
    setHeaderTime(HomeHeaderTime());
  }, []);

  const plusStateToggle = () => {
    setPlusState((current) => !current);
  };

  return (
    <header className={styles.HomeHeader}>
      <ul>
        <li>
          <h1>Sseong's</h1>
        </li>
        <li>
          <MediumIcon src={plusImage} onClick={plusStateToggle}></MediumIcon>
          <div style={plusState ? { display: "flex" } : { display: "none" }}>
            <button>날씨</button>
            <button>버스</button>
            <button>주식</button>
          </div>
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

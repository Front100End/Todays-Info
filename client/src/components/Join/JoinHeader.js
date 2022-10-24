import React from "react";
import styles from "./JoinHeader.module.scss";
const JoinHeader = (props) => {
  return (
    <header className={styles.JoinHeader}>
      <h2>오늘의정보에 오신걸 환영합니다!</h2>
      <p>
        오늘의정보에서는 오늘의 날씨, 버스시간, 주식정보 등을 한번에 알 수
        있답니다 :)
      </p>
    </header>
  );
};

export default JoinHeader;

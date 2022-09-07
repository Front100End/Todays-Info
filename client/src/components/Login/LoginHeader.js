import React from "react";
import styles from "./LoginHeader.module.scss";

const LoginHeader = (props) => {
  return (
    <header className={styles.LoginHeader}>
      <h2>
        <span className={styles.logoImage}></span>오늘의정보
      </h2>
      <p>오늘의정보는 항상 회원님들을 응원합니다.</p>
    </header>
  );
};

export default LoginHeader;

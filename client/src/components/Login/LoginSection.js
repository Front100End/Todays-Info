import React from "react";
import styles from "./LoginSection.module.scss";
import { LongBarInput, LongBarButton } from "../../styles/LongBar";

const LoginSection = (props) => {
  return (
    <section className={styles.LoginSection}>
      <LongBarInput type="text" placeholder="아이디 입력"></LongBarInput>
      <LongBarInput type="password" placeholder="비밀번호 입력"></LongBarInput>
      <LongBarButton type="submit">로그인</LongBarButton>
    </section>
  );
};

export default LoginSection;

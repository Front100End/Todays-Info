import React, { useState } from "react";
import styles from "./LoginSection.module.scss";
import { LongBarInput, LongBarButton } from "../../styles/LongBar";
import { Link } from "react-router-dom";
import * as api from "../../api/LoginApi";

const LoginSection = (props) => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginRequest = async (id, password) => {};

  return (
    <section className={styles.LoginSection}>
      <LongBarInput
        type="text"
        placeholder="아이디 입력"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      ></LongBarInput>
      <LongBarInput
        type="password"
        placeholder="비밀번호 입력"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      ></LongBarInput>
      <Link to={`/home`}>
        <LongBarButton
          type="submit"
          onClick={() => loginRequest(userId, userPassword)}
        >
          로그인
        </LongBarButton>
      </Link>
    </section>
  );
};

export default LoginSection;

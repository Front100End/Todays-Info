import React, { useState } from "react";
import styles from "./LoginSection.module.scss";
import { LongBarInput, LongBarButton } from "../../styles/LongBar";
import { loginAction } from "./loginAction";
import { useNavigate } from "react-router-dom";

const LoginSection = (props) => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAlert, setUserAlert] = useState("");
  const navigate = useNavigate();
  const alertSetting = (alert) => {
    setUserAlert(`${alert}`);
  };
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
        onKeyDown={(e) => {
          if (e.key === "Enter")
            loginAction(userId, userPassword, navigate, alertSetting);
        }}
      ></LongBarInput>
      <p className={styles.loginGuide}>{userAlert}</p>
      <LongBarButton
        type="submit"
        onClick={() =>
          loginAction(userId, userPassword, navigate, alertSetting)
        }
      >
        로그인
      </LongBarButton>
    </section>
  );
};

export default LoginSection;

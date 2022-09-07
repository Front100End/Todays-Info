import React from "react";
import styles from "./LoginArticle.module.scss";
import { Link } from "react-router-dom";

const LoginArticle = (props) => {
  return (
    <ul className={styles.LoginArticle}>
      <li>아이디 찾기</li>
      <li>비밀번호 찾기</li>
      <li>
        <Link to={`/join`}>회원가입</Link>
      </li>
    </ul>
  );
};

export default LoginArticle;

import React from "react";
import LoginHeader from "../../components/Login/LoginHeader";
import LoginSection from "../../components/Login/LoginSection";
import LoginArticle from "../../components/Login/LoginArticle";
import styles from "./Login.module.scss";
const Login = (props) => {
  return (
    <div className={styles.wrap}>
      <LoginHeader></LoginHeader>
      <LoginSection></LoginSection>
      <LoginArticle></LoginArticle>
    </div>
  );
};

export default Login;

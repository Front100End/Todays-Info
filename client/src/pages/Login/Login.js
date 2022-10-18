import React, { useEffect, useState } from "react";
import LoginHeader from "../../components/Login/LoginHeader";
import LoginSection from "../../components/Login/LoginSection";
import LoginArticle from "../../components/Login/LoginArticle";
import * as api from "../../api/authAPI";
import styles from "./Login.module.scss";
import useAuthAction from "../../hooks/useAuthAction";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
  const [loading, setLoading] = useState(true);
  const User = useSelector((state) => state.userReducer.currentUser);
  const homeLoading = (state) => {
    setLoading(state);
  };
  useAuthAction(homeLoading);

  return (
    <div className={styles.wrap}>
      <div className={styles.homeWrap}>
        <LoginHeader></LoginHeader>
        <LoginSection></LoginSection>
        <LoginArticle></LoginArticle>
      </div>
    </div>
  );
};

export default Login;

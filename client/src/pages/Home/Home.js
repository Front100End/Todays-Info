import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import HomeHeader from "../../components/Home/HomeHeader";
import HomeFooter from "../../components/Home/HomeFooter";
import HomeSection from "../../components/Home/HomeSection";
import useAuthAction from "../../hooks/useAuthAction";
import { useSelector } from "react-redux";
import * as initApi from "../../api/initDataAPI";
const Home = (props) => {
  const [accessState, setAccessState] = useState(false);
  const [loading, setLoading] = useState(false);
  const User = useSelector((state) => state.userReducer.currentUser);

  const homeLoading = (state) => {
    setLoading(state);
  };
  const access = useAuthAction(homeLoading).then((response) =>
    setAccessState(response)
  );

  // const setAllInitState = async (id) => {
  //   let initStockCode = await initApi.setStocksInitState(id);
  //   console.log(initStockCode);
  // };
  // useEffect(() => {
  //   setAllInitState(User[0].id);
  // }, []);
  return (
    <div className={styles.Home}>
      {loading ? (
        <div className={styles.homeWrap}>
          <HomeHeader></HomeHeader>
          <HomeSection></HomeSection>
          <HomeFooter></HomeFooter>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;

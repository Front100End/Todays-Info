import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import HomeHeader from "../../components/Home/HomeHeader";
import HomeFooter from "../../components/Home/HomeFooter";
import HomeSection from "../../components/Home/HomeSection";
import useAuthAction from "../../hooks/useAuthAction";
import { useSelector } from "react-redux";
const Home = (props) => {
  const [accessState, setAccessState] = useState(false);
  let access = useAuthAction().then((response) => setAccessState(response));
  const User = useSelector((state) => state.userReducer.currentUser);
  useEffect(() => {
    console.log(accessState);
  }, []);

  return (
    <div className={styles.Home}>
      <HomeHeader></HomeHeader>
      <HomeSection></HomeSection>
      <HomeFooter></HomeFooter>
    </div>
  );
};

export default Home;

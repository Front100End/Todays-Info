import React from "react";
import styles from "./Home.module.scss";
import HomeHeader from "../../components/Home/HomeHeader";
import HomeFooter from "../../components/Home/HomeFooter";
import HomeSection from "../../components/Home/HomeSection";
const Home = (props) => {
  return (
    <div className={styles.Home}>
      <HomeHeader></HomeHeader>
      <HomeSection></HomeSection>
      <HomeFooter></HomeFooter>
    </div>
  );
};

export default Home;

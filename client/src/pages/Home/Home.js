import React, { useState } from "react";
import styles from "./Home.module.scss";
import HomeHeader from "../../components/Home/HomeHeader";
import HomeFooter from "../../components/Home/HomeFooter";
import HomeSection from "../../components/Home/HomeSection";
import useAuthAction from "../../hooks/useAuthAction";
const Home = (props) => {
  const [accessState, setAccessState] = useState(true);
  const [loading, setLoading] = useState(true);

  const homeLoading = (state) => {
    setLoading(state);
  };
  const access = useAuthAction(homeLoading).then((response) =>
    setAccessState(response)
  );

  return (
    <div className={styles.Home}>
      {loading ? (
        ""
      ) : (
        <div className={styles.homeWrap}>
          <HomeHeader></HomeHeader>
          <HomeSection></HomeSection>
          <HomeFooter></HomeFooter>
        </div>
      )}
    </div>
  );
};

export default Home;

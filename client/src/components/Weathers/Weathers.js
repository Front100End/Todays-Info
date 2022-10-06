import React, { useState } from "react";
import styles from "../Home/SectionChange/ChangeBox/FirstChange.module.scss";
import useWeatherInitData from "../../hooks/useWeatherInitData";
import { FirstSubBox, SecondSubBox } from "../../styles/Item";
import CreateWeathers from "./CreateWeathers";
const Weathers = (props) => {
  const [loading, setLoading] = useState(true);
  const loadingToggle = () => {
    setLoading((current) => !current);
  };
  useWeatherInitData(loadingToggle);
  const SubItem = {
    1: (
      <FirstSubBox className={styles.Weather}>
        <CreateWeathers></CreateWeathers>
      </FirstSubBox>
    ),
    2: (
      <SecondSubBox className={styles.Weather}>
        <CreateWeathers></CreateWeathers>
      </SecondSubBox>
    ),
  };

  return (
    <React.Fragment>
      {loading ? "" : <div>{SubItem[props.menuState]}</div>}
    </React.Fragment>
  );
};

export default Weathers;

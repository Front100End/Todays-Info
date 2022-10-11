import React, { useState } from "react";
import styles from "../Home/SectionChange/ChangeBox/FirstChange.module.scss";
import Item from "../item";
import { FirstSubBox, SecondSubBox } from "../../styles/Item";
import CreateBuses from "./CreateBuses";
import useBusInitData from "../../hooks/useBusInitData";
const Buses = (props) => {
  const [loading, setLoading] = useState(true);
  const loadingToggle = () => {
    setLoading((current) => !current);
  };
  useBusInitData(loadingToggle);
  const SubItem = {
    1: (
      <FirstSubBox className={styles.Stock}>
        <CreateBuses></CreateBuses>
      </FirstSubBox>
    ),
    2: (
      <SecondSubBox className={styles.Stock}>
        <CreateBuses></CreateBuses>
      </SecondSubBox>
    ),
  };
  return (
    <React.Fragment>
      {loading ? "" : <div>{SubItem[props.menuState]}</div>}
    </React.Fragment>
  );
};

export default Buses;

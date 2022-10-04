import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreateBuses.module.scss";
import BusIamge from "../../images/ico_bus.png";

const CreateBuses = (props) => {
  const [loading, setLoading] = useState(true);
  const [busArray, setBusArray] = useState([]);
  //   const weatherData = useSelector((state) => state.weatherReducer.weatherData);

  //   useEffect(() => {
  //     setLoading(true);
  //     setBusArray();
  //     setLoading(false);
  //   }, [weatherData]);
  return (
    <ul className={styles.CreateBuses}>
      <li>
        <img src={BusIamge} alt="" />
        <h2>버스</h2>
      </li>
      {loading === true ? "" : <li></li>}
    </ul>
  );
};

export default CreateBuses;

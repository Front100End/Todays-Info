import React, { useEffect, useState } from "react";
import WeatherModal from "./ModalType/WeatherModal";
import BusModal from "./ModalType/BusModal";
import StockModal from "./ModalType/StockModal";
import styles from "./SetModal.module.scss";
import { LargeIcon, MediumIcon } from "../../styles/Icons";
import busIconImage from "../../images/ico_bus.png";
import weatherIconImage from "../../images/ico_weather.png";
import stockIconImage from "../../images/ico_stock.png";

const SetModal = ({ type, modalStateToggle }) => {
  const [modalType, setModalType] = useState("");
  const modalItems = {
    weather: <WeatherModal></WeatherModal>,
    bus: <BusModal></BusModal>,
    stock: <StockModal></StockModal>,
  };
  const modalIcon = {
    weather: [weatherIconImage, "날씨", "#F6FFF8"],
    bus: [busIconImage, "버스", "#FFFEF6"],
    stock: [stockIconImage, "주식", "#FFF6F6"],
  };

  const modalSwitch = (switchType) => {
    setModalType(switchType);
  };
  useEffect(() => {
    modalSwitch(type);
  }, []);

  return (
    <React.Fragment>
      {modalType === "" ? (
        ""
      ) : (
        <div className={styles.SetModal}>
          {modalItems[modalType]}
          <ul>
            <li>
              <img src={modalIcon[modalType][0]}></img>
            </li>
            <li>
              <h3>{modalIcon[modalType][1]}</h3>
            </li>
          </ul>
          <button onClick={() => modalStateToggle()}>X</button>
        </div>
      )}
    </React.Fragment>
  );
};

export default SetModal;

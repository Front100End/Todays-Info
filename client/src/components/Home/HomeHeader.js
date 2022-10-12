import React, { useState, useEffect, useRef } from "react";
import SetModal from "../Modal/SetModal";
import styles from "./HomeHeader.module.scss";
import modalStyles from "./modalStyle.module.scss";
import plusImage from "../../images/circle-plus-solid.svg";
import user from "../../images/user-solid.svg";
import { MediumIcon } from "../../styles/Icons";
import { HomeHeaderTime } from "../../functions/Times";
import { logoutAction } from "../Login/logoutAction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeHeader = (props) => {
  const [headerTime, setHeaderTime] = useState();
  const [plusState, setPlusState] = useState(false);
  const [myPageState, setMyPageState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    setHeaderTime(HomeHeaderTime());
    console.log(userInfo[0]);
  }, []);

  const plusStateToggle = () => {
    if (myPageState) {
      setMyPageState((current) => !current);
    }
    setPlusState((current) => !current);
  };
  const myPageStateToggle = () => {
    if (plusState) {
      setPlusState((current) => !current);
    }
    setMyPageState((current) => !current);
  };
  const modalStateToggle = () => {
    setModalState((current) => !current);
  };
  const setModalChange = (type) => {
    setModalType(type);
  };

  return (
    <div className={styles.HomeHeaderWrap}>
      {modalState ? (
        <React.Fragment>
          <div
            className={modalStyles.modalOverlay}
            onClick={() => modalStateToggle()}
          ></div>
          <section className={modalStyles.modal}>
            <SetModal
              type={modalType}
              modalStateToggle={modalStateToggle}
            ></SetModal>
          </section>
        </React.Fragment>
      ) : (
        ""
      )}

      <header className={styles.HomeHeader}>
        <ul>
          <li>
            <h1>{userInfo[0].userNickname}'s</h1>
          </li>
          <li>
            <MediumIcon
              src={plusImage}
              onClick={() => plusStateToggle()}
            ></MediumIcon>
            <MediumIcon
              src={user}
              onClick={() => myPageStateToggle()}
            ></MediumIcon>
            <div style={plusState ? { display: "flex" } : { display: "none" }}>
              <button
                onClick={() => {
                  setModalChange("weather");
                  modalStateToggle();
                  plusStateToggle();
                }}
              >
                날씨
              </button>
              <button
                onClick={() => {
                  setModalChange("bus");
                  modalStateToggle();
                  plusStateToggle();
                }}
              >
                버스
              </button>
              <button
                onClick={() => {
                  setModalChange("stock");
                  modalStateToggle();
                  plusStateToggle();
                }}
              >
                주식
              </button>
            </div>
            <div
              style={myPageState ? { display: "flex" } : { display: "none" }}
            >
              <button onClick={() => logoutAction(userInfo[0].id, navigate)}>
                로그아웃
              </button>
            </div>
          </li>
        </ul>
        <div className={styles.todayInform}>
          <p>오늘의 정보</p>
          <p>{headerTime}</p>
        </div>
      </header>
    </div>
  );
};

export default HomeHeader;

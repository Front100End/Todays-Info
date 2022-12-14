import React, { useState, useEffect } from "react";
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
  const [navActive, setNavActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userReducer.currentUser);

  const scrollFixed = () => {
    if (scrollY > 50 && window.innerWidth < 768) {
      setScrollY(window.pageYOffset);
      setNavActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setNavActive(false);
    }
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", scrollFixed);
    };
    scrollListener();
    return () => {
      window.removeEventListener("scroll", scrollFixed);
    };
  });

  useEffect(() => {
    setHeaderTime(HomeHeaderTime());
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
    <header className={styles.HomeHeaderWrap}>
      {modalState ? (
        <React.Fragment>
          <div
            className={modalStyles.modalOverlay}
            onClick={() => modalStateToggle()}
          ></div>
          <section
            className={modalStyles.modal}
            style={navActive === true ? { marginTop: `${scrollY}px` } : {}}
          >
            <SetModal
              type={modalType}
              modalStateToggle={modalStateToggle}
            ></SetModal>
          </section>
        </React.Fragment>
      ) : (
        ""
      )}

      <header
        className={styles.HomeHeader}
        style={navActive ? { padding: "15px" } : {}}
      >
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
                ??????
              </button>
              <button
                onClick={() => {
                  setModalChange("bus");
                  modalStateToggle();
                  plusStateToggle();
                }}
              >
                ??????
              </button>
              <button
                onClick={() => {
                  setModalChange("stock");
                  modalStateToggle();
                  plusStateToggle();
                }}
              >
                ??????
              </button>
            </div>
            <div
              style={myPageState ? { display: "flex" } : { display: "none" }}
            >
              <button onClick={() => logoutAction(userInfo[0].id, navigate)}>
                ????????????
              </button>
            </div>
          </li>
        </ul>
        <div
          className={styles.todayInform}
          style={navActive ? { display: "none" } : { display: "block" }}
        >
          <p>????????? ??????</p>
          <p>{headerTime}</p>
        </div>
      </header>
    </header>
  );
};

export default HomeHeader;

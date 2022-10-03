import React, { useEffect } from "react";
import styles from "./HomeFooter.module.scss";
import { useSelector } from "react-redux";

const HomeFooter = (props) => {
  const User = useSelector((state) => state.userReducer.currentUser);

  return <footer className={styles.HomeFooter}>{User.id}</footer>;
};

export default HomeFooter;

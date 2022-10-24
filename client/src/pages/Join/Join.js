import React from "react";
import JoinHeader from "../../components/Join/JoinHeader";
import JoinSection from "../../components/Join/JoinSection";
import styles from "./Join.module.scss";

const Join = (props) => {
  return (
    <div className={styles.Join}>
      <JoinHeader></JoinHeader>
      <JoinSection></JoinSection>
    </div>
  );
};

export default Join;

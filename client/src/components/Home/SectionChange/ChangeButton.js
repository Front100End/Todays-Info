import React from "react";
import styles from "./ChangeButton.module.scss";
import { MediumButtonIcon, MediumIcon } from "../../../styles/Icons";
import ButtonHeightImage from "../../../images/change-button-height.svg";
import ButtonWidthImage from "../../../images/change-button-width.svg";

const ChangeButton = (props) => {
  return (
    <div className={styles.ChangeButton}>
      <ul>
        <li>
          <MediumButtonIcon>
            <MediumIcon
              src={ButtonHeightImage}
              onClick={() => props.menuSwitching(1)}
            ></MediumIcon>
          </MediumButtonIcon>
        </li>
        <li>
          <MediumButtonIcon>
            <MediumIcon
              src={ButtonWidthImage}
              onClick={() => props.menuSwitching(2)}
            ></MediumIcon>
          </MediumButtonIcon>
        </li>
      </ul>
    </div>
  );
};

export default ChangeButton;

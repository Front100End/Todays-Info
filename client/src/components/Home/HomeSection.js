import React, { useState, useEffect } from "react";
import styles from "./HomeSection.module.scss";
import FirstChange from "./SectionChange/ChangeBox/FirstChange";
import SecondChange from "./SectionChange/ChangeBox/SecondChange";
import ChangeButton from "./SectionChange/ChangeButton";

const HomeSection = (props) => {
  const [menuState, setMenuState] = useState(1);
  const menuSwitching = (menuNum) => {
    setMenuState(menuNum);
  };
  const menu = {
    1: <FirstChange menuState={menuState}></FirstChange>,
    2: <SecondChange menuState={menuState}></SecondChange>,
  };

  return (
    <section>
      <ChangeButton menuSwitching={menuSwitching}></ChangeButton>
      {menu[menuState]}
    </section>
  );
};

export default HomeSection;

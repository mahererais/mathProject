import React from "react";
import "./Menu.scss";
import "../Header/Header";

import ButtonMenu from "./ButtonMenu/ButtonMenu";
import Header from "../Header/Header";

const Menu: React.FC = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="menu">
        <ButtonMenu text={"solo"} />
        <ButtonMenu text={"duo"} />
      </div>
    </>
  );
};

export default Menu;

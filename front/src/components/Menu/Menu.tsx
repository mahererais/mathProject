import React from "react";
import "./Menu.scss";
import "../Header/Header";

import ButtonMenu from "./ButtonMenu/ButtonMenu";

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

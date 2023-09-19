import React from "react";
import "./Menu.scss";

import ButtonMenu from "./ButtonMenu/ButtonMenu";

const Menu : React.FC = () => {

    

    return (
        <div className="menu">

            <ButtonMenu text={"solo"}/>
            <ButtonMenu text={"duo"}/>

        </div>
    );
}   

export default Menu;
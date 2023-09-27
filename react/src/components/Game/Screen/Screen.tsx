import React from "react";
import "./Screen.scss";


type Props = {
    value       : string,
    equation?   : string,
}

const Screen: React.FC<Props> = ({value, equation}) => {
  return (
    <>
      <div className="screen">
        <span className="left">{equation} = </span>
        <span className="right">{value}</span>
      </div>
    </>
  );
};

export default Screen;

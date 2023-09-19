import React from "react";
import "./Operators.scss";
import Operator from "./Operator/Operator";

type Props = {
    mode: string
}

const Operators : React.FC<Props> = ({mode}) => {

    return (
        <div className="operator_containers">
            <Operator operator="+" mode={mode}/>
            <Operator operator="-" mode={mode}/>
            <Operator operator="x" mode={mode}/>
            <Operator operator="/" mode={mode}/>
        </div>
    );
}   

export default Operators;
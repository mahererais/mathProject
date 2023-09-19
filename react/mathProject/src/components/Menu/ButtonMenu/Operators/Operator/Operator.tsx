import React from "react";
import "./Operator.scss";
import { Link } from "react-router-dom";


type Props = {
    operator: string, 
    mode: string
}

const Operator : React.FC<Props> = ({operator, mode}) => {

    const operatorUrl = (() => {
        switch (operator) {
            case "+": return "plus";
            case "-": return "minus";
            case "x": return "time";
            case "/": return "divide";
        
            default:
                return "unknow_operator";
        }
    })();

    return (
        <Link className="operator" to={`/${mode}/${operatorUrl}`}>{operator}</Link>
    );
}   

export default Operator;
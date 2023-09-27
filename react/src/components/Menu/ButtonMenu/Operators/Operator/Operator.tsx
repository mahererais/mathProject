import React from "react";
import "./Operator.scss";
import { Link } from "react-router-dom";
import { operatorString } from "../../../../Game/Controller/Controller";

type Props = {
    operator: string, 
    mode: string
}

const Operator : React.FC<Props> = ({operator, mode}) => {

    const operatorUrl = operatorString(operator);

    return (
        <Link className="operator" to={`/${mode}/${operatorUrl}`}>{operator}</Link>
    );
}   

export default Operator;
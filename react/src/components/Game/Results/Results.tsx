import React from "react";
import "./Results.scss";

import { useNavigate } from "react-router-dom";

enum GameMode {
  end,
  begin,
  retry,
  run,
  pause,
}

type Props = {
  equations: string[];
  results: string[];
  setGameMode: React.Dispatch<GameMode>;
};

const Results: React.FC<Props> = ({ equations, results, setGameMode}) => {
  
  const navigate = useNavigate();


  const checkResultFor:(index: number) => boolean =  (index: number) => {
    const equation = equations[index];
    const result = results[index];
    console.log(equation);
    console.log(result);

    return eval(equation) == result 
  }

  console.log("map index : " + equations);
  return (
    <div className="results_container">
      <div className="results_header">
        <span>Equations</span>
        <span>J1</span>
      </div>
      <div className="results_body">
        {equations.map((equation, index) => {
          console.log("map index: " + index);
          return (
            <>
              <span key={index}>{equation}</span>
              <span key={1000 + index} className={checkResultFor(index) ? "success" : "failed"}>{results[index]}</span>
            </>
          );
        })}
      </div>
      <div className="results_button">
        <button type="button" onClick={() => { navigate("/")}}>Menu</button>
        <button type="button" onClick={() => { setGameMode(GameMode.retry)}}>Retry</button>
      </div>
    </div>
  );
};

export default Results;

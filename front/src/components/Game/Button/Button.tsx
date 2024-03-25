import React from "react";
import "./Button.scss";

enum GameMode {
    end,
    begin,
    retry,
    run,
    pause,
}

type Props = {
    value : string,
    update: (value: string) => void,
    gameMode: GameMode,
}

const Button : React.FC<Props> = ({value, update, gameMode}) => {

    return (
        <div className={`button ${value == "AC" ? "AC" : (value == "OK") ? "OK" : ''}`}
             onClick={(e) => {update(e.currentTarget.textContent as string)}}
             style={{pointerEvents: gameMode === GameMode.end ? "none" : ''}}>
                {value}
        </div>
    );
}   

export default Button;
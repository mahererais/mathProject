import React, { useEffect, useRef, useState } from "react";
import "./Game.scss";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button/Button";
import Screen from "./Screen/Screen";
import Results from "./Results/Results";
import { getRandomEquations, operatorSymbol } from "./Controller/Controller";

enum GameMode {
    end = 0 ,
    begin = 1 ,
    retry = 2,
    run = 4 ,
    pause = 8,
}

const Game : React.FC = () => {

    // const equations = [
    //     "95 + 99",
    //     "1 + 1",
    //     "4 + 5",
    //     "5 + 6",
    //     "7 + 1",
    //     "2 + 8",
    //     "8 + 3",
    //     "12 + 4",
    // ];

    
    const [userResult, setUserResult] = useState<string[]>([]);
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.begin);
    const [screenValue, setScreenValue] = useState(""); 
    const [equationIndex, setEquationIndex] = useState(0); 
    const [equations, setEquations] = useState<string[]>([]);

    const  {operator} = useParams();
    //const navigate = useNavigate();

    console.log(GameMode.pause)

    const gameContainerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (gameMode == GameMode.retry) {
            setUserResult([]);
            setScreenValue('');
            setEquationIndex(0);
        }
        if ((gameMode == GameMode.begin) || (gameMode == GameMode.retry)) {
            setGameMode(GameMode.run)
            setEquations(getRandomEquations(10, symbolOperator));
            console.log(equations);
        }
        gameContainerRef.current?.focus();
    }, [gameMode]);

    const symbolOperator  = operatorSymbol(operator ?? "+");


    const keydown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        console.log(e.code);
        
        switch (e.code) {
            case "Numpad1": updateScreenValue("1");break;
            case "Numpad2": updateScreenValue("2");break;
            case "Numpad3": updateScreenValue("3");break;
            case "Numpad4": updateScreenValue("4");break;
            case "Numpad5": updateScreenValue("5");break;
            case "Numpad6": updateScreenValue("6");break;
            case "Numpad7": updateScreenValue("7");break;
            case "Numpad8": updateScreenValue("8");break;
            case "Numpad9": updateScreenValue("9");break;
            case "Numpad0": updateScreenValue("0");break;
            case "NumpadEnter": updateScreenValue("OK");break;
            case "Enter": updateScreenValue("OK");break;
            case "Backspace": updateScreenValue("AC");break;
        
            default:
                break;
        }
    } 
    

    const updateScreenValue = (value: string) => {
        if (gameMode == GameMode.end)
            return ;
            
        switch (value) {
            case "AC": 
                setScreenValue("");
                break;
            case "OK": 
                if (!screenValue.trim())
                    return 

                setScreenValue("");
                setUserResult(prev =>  [...prev, screenValue]);
                setEquationIndex(prev => prev + 1);
                if (userResult.length + 1 >= equations.length) {
                    console.log(gameMode);
                    setGameMode(GameMode.end);
                }
                console.log(userResult);
                break;
        
            default:
                if (gameMode === GameMode.run && screenValue.length < 5)
                    setScreenValue(prev =>  prev === "0" ? value : prev + value);
                break;
        }

        
    };

    return (
            // = https://stackoverflow.com/questions/43503964/onkeydown-event-not-working-on-divs-in-react
        <>
            {/* <button className="back" onClick={() => { navigate("/")}}>Menu</button> */}
            <div className="game_containers" onKeyDown={keydown} ref={gameContainerRef} tabIndex={0}>
                <Screen value={screenValue} equation={equations[equationIndex]} />
                <div className="buttons">
                    {["1","2","3","4","5","6","7","8","9","0"].map((element: string, index) => {
                        return <Button value={element} key={index} update={updateScreenValue} gameMode={gameMode}/>
                    })}
                    <Button value="AC" update={updateScreenValue} gameMode={gameMode}/>
                    <Button value="OK" update={updateScreenValue} gameMode={gameMode}/>
                </div>
                {gameMode === GameMode.end ? <Results equations={equations} results={userResult} setGameMode={setGameMode}/> : ""} 
            </div>
        </>
    );
}   

export default Game;
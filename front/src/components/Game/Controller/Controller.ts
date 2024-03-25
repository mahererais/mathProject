const getRandomInt = (max: number, min: number = 0) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export const getRandomEquations = ( size: number = 10, operator: string = "+"): string[] => {
  
    const equations = [];

    for (let index = 0; index < size; index++) {
        const a = getRandomInt(10, 1);
        const b = getRandomInt(10, 1);
        equations.push(`${a} ${operator == "x" ? "*" : operator} ${b}`)
    }
  
    return equations;
};

export const operatorSymbol = (operator: string): string => {
    switch (operator) {
        case "plus":
        return "+";
        case "minus":
        return "-";
        case "time":
        return "x";
        case "divide":
        return "/";

        default:
        return "unknow_operator";
    }
};

export const operatorString = (operatorSymbol: string): string => {
    switch (operatorSymbol) {
        case "+": return "plus";
        case "-": return "minus";
        case "x": return "time";
        case "/": return "divide";
    
        default:
            return "unknow_operator";
    }
};

let answer;

function add(n1, n2) {
    answer = roundAnswer(n1 + n2);
    return answer;
}

function subtract(n1, n2) {
    answer = roundAnswer(n1 - n2);
    return answer;
}

function multiply(n1, n2) {
    answer = roundAnswer(n1 * n2);
    return answer;
}

function divide(n1, n2) {
    if(n2 === 0) return "MATH ERROR";
    answer = roundAnswer(n1/n2);
    return answer;
}

function calcExponent(n1,n2) {
    answer = roundAnswer(Math.pow(n1, n2));
    return answer;
}

function roundAnswer(answer) {
    return Math.round(answer * 10000000)/10000000;
}

function operate(op, n1, n2) {
    switch(op) {
        case "+":
        return add(n1,n2);
        case "-":
        return subtract(n1,n2);
        case "*":
        return multiply(n1,n2);
        case "/":
        return divide(n1,n2);
        case "^":
        return calcExponent(n1,n2)
    }
}

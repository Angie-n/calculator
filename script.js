function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    if(n2 === 0) return "MATH ERROR";
    return n1/n2;
}

function calcExponent(n1,n2) {
    return Math.pow(n1, n2);
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

let answer = null;
let currentInput = null;
let n1 = "";
let n2 = "";
let op = "";
let lastPressedIsNum = false;
let lastPressedIsEquals = false;
let extraOp;

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
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);
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
        case "":
        answer = n1;
        return answer;
    }
}

function display(op, n1, n2) {
    if(op != "" && n1 != "" && n2 != "") {
        document.getElementById("user-input").textContent = `${n1} ${op} ${n2} =`;
        document.getElementById("answer").textContent = `${answer}`;
    }
    else if (op === "" && n1 != "" && n2 === "" && answer !== "SYNTAX ERROR"){
        document.getElementById("user-input").textContent = `${n1} =`;
        document.getElementById("answer").textContent = `${answer}`;
    }
    else if (answer === "SYNTAX ERROR") {
        document.getElementById("user-input").textContent = `${n1} ${extraOp} =`;
        document.getElementById("answer").textContent = `${answer}`;
    }
    else if (op != "" && n1 != "") {
        document.getElementById("user-input").textContent = `${n1} ${op}`;
        document.getElementById("answer").textContent = `${n1}`;
    }
    else {
        document.getElementById("user-input").textContent = `${n1}`;
        document.getElementById("answer").textContent = `${n1}`;
    }
}

function sacNum(event) {
    if(lastPressedIsEquals) sacClear();
    if(op === "" && n1.length < 11) {
        n1 = n1 + event.textContent;
        currentInput = n1;
    }
    else if (op != "" && n2.length < 11) {
        n2 = n2 + event.textContent;
        currentInput = n2;
    }
    lastPressedIsNum = true;
    lastPressedIsEquals = false;
    document.getElementById("answer").textContent = `${currentInput}`;
}

function checkIfDecimalLast() {
    if(currentInput.substring(currentInput.length - 1) === ".") {
        if (currentInput === n1) {
            n1 = n1 + "0";
            currentInput = n1;
        }
        else {
            n2 = n2 + "0";
            currentInput = n2;
        }
    }
}

function checkForErrors() {
    if(answer === "MATH ERROR" || answer === "SYNTAX ERROR") sacClear();
}

function sacOperator(event) {
    if(currentInput !== null) checkIfDecimalLast();
    if(event.id === "evaluate-btn") lastPressedIsEquals = true;
    else lastPressedIsEquals = false;
    if(lastPressedIsNum) {
        if (op === "" && !lastPressedIsEquals) {
            op = event.textContent;
            display(op, n1, n2);
        }
        else {
            answer = operate(op, n1, n2);
            display(op, n1, n2);
            n1 = answer;
            currentInput = `${n1}`;
            n2 = "";
            if(!lastPressedIsEquals) op = event.textContent;
            else op = "";
        }
        if (!lastPressedIsEquals) {
            currentInput = null;
            lastPressedIsNum = false;
            lastPressedIsEquals = false;
        }
    }
    else if (op !== "" && !lastPressedIsEquals) {
        op = event.textContent;
        display(op, n1, n2);
    }
    else {
        extraOp = op;
        op = "";
        answer = "SYNTAX ERROR";
        display(op, n1, n2);
    }
}

function sacDecimal() {
    if(lastPressedIsEquals) sacClear();
    if(currentInput === null) currentInput = "";
            if(!currentInput.includes(".")) {
                if(currentInput === n1) {
                    n1 = n1 + ".";
                    currentInput = n1;
                }
                else {
                    n2 = n2 + ".";
                    currentInput = n2;
                }
                lastPressedIsNum = true;
            }
            document.getElementById("answer").textContent = `${currentInput}`;
}

function sacSign() {
    let firstIndex = currentInput.substring(0,1);
            if (firstIndex === "-") {
                if(currentInput === n1) {
                    n1 = n1.substring(1);
                    currentInput = n1;
                }
                else {
                    n2 = n2.substring(1);
                    currentInput = n2;
                }
            }
            else {
                if(currentInput === n1) {
                    n1 = "-" + n1;
                    currentInput = n1;
                }
                else {
                    n2 = "-" + n2;
                    currentInput = n2;
                }
            }
    document.getElementById("answer").textContent = `${currentInput}`;
}

function sacDelete() {
    if(currentInput === n1 && n1.length > 0) {
        n1 = n1.substring(0, n1.length - 1);
        currentInput = n1;
    }
    else if (n2.length > 0) {
        n2 = n2.substring(0, n2.length - 1);
        currentInput = n2;
    }
    if(currentInput !== null) document.getElementById("answer").textContent = `${currentInput}`;
}

function sacClear() {
    answer = null;
    currentInput = null;
    n1 = "";
    n2 = "";
    op = "";
    lastPressedIsNum = false;
    lastPressedIsEquals = false;
    document.getElementById("user-input").textContent = "";
    document.getElementById("answer").textContent = "";
}

function storeAndCalc() {
    checkForErrors();
    if (this.className === "num-btns") sacNum(this);
    else if (this.className === "operator-btns") sacOperator(this);
    else if (this.id === "decimal-btn") {
        sacDecimal();
    }
    else if (this.id === "sign-btn") {
        if(currentInput !== null && currentInput.length > 0 && !lastPressedIsEquals) {
            sacSign();
        }
    }
    else if (this.id === "delete-btn") {
        sacDelete();
    }
    else sacClear();
}

document.querySelectorAll("button").forEach(node => {
    node.addEventListener("click", storeAndCalc);
});

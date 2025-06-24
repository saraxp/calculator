let exp = [];
let currentInput = '';
let oldInput = '';
let currentOperator = '';
let displayOperator = '';
let result = 0;
let precedence = ['/', '*', '+', '-']

function callNumber(input) {
    currentInput += input;
    document.getElementById('result').value = `${oldInput}${displayOperator}${currentInput}`;
}

function callOperator(operation) {
    if (currentInput === '') return;
    exp.push(currentInput);
    oldInput = currentInput;
    currentInput = '';
    currentOperator = operation;
    displayOperator = operation;
    exp.push(currentOperator);

    // Show the operator before clearing it
    document.getElementById('result').value = `${oldInput}${displayOperator}${currentInput}`;

    currentOperator = ''; 
    console.log(exp);
}

function clearDisplay (){
    document.getElementById('result').value = '';
    exp = [];
    currentInput = '';
    oldInput = '';
    currentOperator = '';
    displayOperator = '';
    result = 0;
}

function calculate() {
    
    if (currentInput !== '') {
    exp.push(currentInput);
    currentInput = '';
    }

    for(let op of precedence) {
     //BODMAS
        for (let i = 0; i < exp.length; i++) {
            if(op === exp[i]){
                left = parseInt(exp[i-1]);
                right = parseInt(exp[i+1]);
                switch (op) {
                case "/":
                    result = left / right;
                    break;
                case "*":
                    result = left * right;
                    break;
                case "+":
                    result = left + right;
                    break;
                case "-":
                    result = left - right;
                    break;
                }
                exp.splice(i-1, 3, String(result));
                result = 0;
                i -= 1;
                console.log(exp);
            }   
        }
            
    }
    document.getElementById('result').value = `${exp[0]}`;
}
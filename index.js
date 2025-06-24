let exp = [];
let currentInput = '';
let oldInput = '';
let currentOperator = '';
let displayOperator = '';
let result = 0;
let precedence = ['/', '*', '+', '-']
const cursor = document.getElementById('cursor');
const expression = document.getElementById('expression');

function formatDisplay(expArr) {
    return expArr
        .map(token => {
            if (token === "*") {
                return `<span class="material-symbols-outlined">close</span>`;
            }
            if (token === "/") {
                return `<svg class="divide" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12H20M13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6ZM13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
            }
            return token;
        })
        .join('');
}

function updateDisplay(value) {
    expression.innerHTML = formatDisplay(value);
    cursor.style.display = value.length > 0 ? 'inline' : 'none';
}
function callNumber(input) {
    currentInput += input;
    updateDisplay([...exp, currentInput]);
}

function callOperator(operation) {
    if (currentInput === '') return;
    exp.push(currentInput);
    oldInput = currentInput;
    currentInput = '';
    currentOperator = operation;
    displayOperator = operation;
    exp.push(currentOperator);

   updateDisplay([...exp]); 

    currentOperator = ''; 
    console.log(exp);
}

function clearDisplay (){
    expression.textContent = '';
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
    updateDisplay([exp[0]]);
}
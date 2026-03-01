let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

const currentDisplay = document.getElementById('current');
const expressionDisplay = document.getElementById('expression');

function updateDisplay() {
    currentDisplay.textContent = currentInput;
}

function appendNumber(num) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = num;
        shouldResetScreen = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentInput = '0';
        shouldResetScreen = false;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function setOperator(op) {
    if (operator !== null && !shouldResetScreen) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;

    const opSymbol = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    expressionDisplay.textContent = previousInput + ' ' + opSymbol[op];
}

function calculate() {
    if (operator === null || shouldResetScreen) return;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/': result = curr !== 0 ? prev / curr : 'Error'; break;
    }

    const opSymbol = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    expressionDisplay.textContent = previousInput + ' ' + opSymbol[operator] + ' ' + currentInput + ' =';

    currentInput = result.toString();
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
    expressionDisplay.textContent = '';
    updateDisplay();
}

function toggleSign() {
    if (currentInput === '0') return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function percentage() {
    if (currentInput === '0') return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    else if (e.key === '.') appendDecimal();
    else if (e.key === '+') setOperator('+');
    else if (e.key === '-') setOperator('-');
    else if (e.key === '*') setOperator('*');
    else if (e.key === '/') { e.preventDefault(); setOperator('/'); }
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Escape') clearAll();
    else if (e.key === 'Backspace') {
        currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
        updateDisplay();
    }
});
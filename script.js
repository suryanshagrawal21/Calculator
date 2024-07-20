let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');
let num1 = '';
let num2 = '';
let operator = '';
let result = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let buttonText = button.textContent;

        if (buttonText === 'C') {
            display.value = '';
            num1 = '';
            num2 = '';
            operator = '';
            result = '';
        } else if (buttonText === '=') {}
            if (num1!== '' && num2!== '' && operator!== '') {
                result = calculate(num1, num2, operator);
                display.value = result;
                num1 = result;
                num2 = '';
                operator = '';
            }
         else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
            if (num1!== '') {
                operator = buttonText;
                display.value = '';
            }
        } else {
            if (operator === '') {
                num1 += buttonText;
                display.value = num1;
            } else {
                num2 += buttonText;
                display.value = num2;
            }
        }
    });
});

function calculate(num1, num2, operator) {
    let result = 0;

    switch (operator) {
        case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case '*':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
            result = parseFloat(num1) / parseFloat(num2);
            break;
    }

    return result;
}
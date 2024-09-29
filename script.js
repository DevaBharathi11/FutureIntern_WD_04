let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('btn'));
let operator = '';
let currentValue = '';
let previousValue = '';
let shouldResetDisplay = false;

buttons.map(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const number = e.target.dataset.number;
        const content = e.target.textContent;

        if (number) {
            if (shouldResetDisplay) {
                display.textContent = '';
                shouldResetDisplay = false;
            }
            if (display.textContent === '0') {
                display.textContent = number;
            } else {
                display.textContent += number;
            }
        }

        if (action === 'operator') {
            operator = content;
            previousValue = display.textContent;
            shouldResetDisplay = true;
        }

        if (action === 'decimal') {
            if (!display.textContent.includes('.')) {
                display.textContent += '.';
            }
        }

        if (action === 'clear') {
            display.textContent = '0';
            previousValue = '';
            currentValue = '';
            operator = '';
        }

        if (action === 'delete') {
            display.textContent = display.textContent.slice(0, -1) || '0';
        }

        if (action === 'equal') {
            currentValue = display.textContent;
            let result = 0;
            switch (operator) {
                case '+':
                    result = parseFloat(previousValue) + parseFloat(currentValue);
                    break;
                case '-':
                    result = parseFloat(previousValue) - parseFloat(currentValue);
                    break;
                case '*':
                    result = parseFloat(previousValue) * parseFloat(currentValue);
                    break;
                case '/':
                    result = parseFloat(previousValue) / parseFloat(currentValue);
                    break;
            }
            display.textContent = result;
            shouldResetDisplay = true;
        }
    });
});

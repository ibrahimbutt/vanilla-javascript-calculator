// /* global
// numeral
// :true */
/* eslint no-undef: "error" */
/* eslint no-use-before-define: 0 */

let inputDisplay = document.getElementById('input');
let historyDisplay = document.getElementById('history');
const buttonsSection = document.getElementById('calculator__bottom');

const calculator = {
  total: '',
  add(n) {
    return Number(calculator.total) + Number(n);
  },
};

const view = {
  handleDigitsAndDecimalPress(buttonValue, buttonText) {
    if (inputDisplay.innerText === '0' && buttonText === '.') {
      // avoid leading decimals
      return false;
    }
    if (inputDisplay.innerText === '0' || historyDisplay.innerText.match(/[×−+÷]$/)) {
      inputDisplay.innerText = buttonText;
      return true;
    } else if (buttonValue === 'decimal' && inputDisplay.innerText.includes('.')) {
      return false;
    }
    inputDisplay.innerText += buttonText;
    return true;
  },
  handleOperatorPress(buttonValue, buttonText) {
    if (inputDisplay.innerText === '0') {
      // avoid leading operators
      return false;
    } else if (calculator.total === '' && historyDisplay.innerText === '') {
      historyDisplay.innerText = inputDisplay.innerText;
      calculator.total = historyDisplay.innerText;
      historyDisplay.innerText += buttonText;
    } else {
      calculator.total = calculator[buttonValue](inputDisplay.innerText);
      historyDisplay.innerText += inputDisplay.innerText;
      inputDisplay.innerText = calculator.total;
    }
  },
  clearAll() {
    historyDisplay.innerText = '';
    inputDisplay.innerText = '0';
    calculator.total = '';
  },
};

buttonsSection.addEventListener('click', (event) => {
  const buttonValue = event.target.value;
  const buttonText = event.target.innerText;
  if (Number(buttonText) ||
    buttonValue === '0' ||
    buttonValue === '00' ||
    buttonValue === 'decimal'
  ) {
    view.handleDigitsAndDecimalPress(buttonValue, buttonText);
  } else if (buttonText.match(/[×−+÷]/g)) {
    view.handleOperatorPress(buttonValue, buttonText);
  }
});
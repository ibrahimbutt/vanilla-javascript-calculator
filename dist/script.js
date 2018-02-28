// /* global
// numeral
// :true */
/* eslint no-undef: "error" */
/* eslint no-use-before-define: 0 */

let inputDisplay = document.getElementById('input');
let historyDisplay = document.getElementById('history');
const buttonsSection = document.getElementById('calculator__bottom');

let total = '';
let wasOperatorPressedLast = false;
let lastOperatorPressed = '';

const calculator = {
  add() {
    return Number(total) + Number(inputDisplay.innerText);
  },
  subtract() {
    return Number(total) - Number(inputDisplay.innerText);
  },
  multiply() {
    return Number(total) * Number(inputDisplay.innerText);
  },
  divide() {
    return Number(total) / Number(inputDisplay.innerText);
  },
  getTotal() {
    total = this[lastOperatorPressed]();
    historyDisplay.innerText += inputDisplay.innerText;
    inputDisplay.innerText = total;
  },
  clearAll() {
    total = '';
    wasOperatorPressedLast = false;
    lastOperatorPressed = '';
    inputDisplay.innerText = '0';
    historyDisplay.innerText = '';
  },
};

const onDigitPress = (button) => {
  if (wasOperatorPressedLast) {
    inputDisplay.innerText = button.innerText;
    wasOperatorPressedLast = false;
    return true;
  }
  if (inputDisplay.innerText === '0') {
    inputDisplay.innerText = button.innerText;
  } else {
    inputDisplay.innerText += button.innerText;
  }
};

const onOperatorPress = (button) => {
  wasOperatorPressedLast = true;
  // const lastOperatorPressed = button.value;

  if (total === '') {
    total = inputDisplay.innerText;
  } else {
    total = calculator[lastOperatorPressed]();
  }
  lastOperatorPressed = button.value;

  historyDisplay.innerText = historyDisplay.innerText + inputDisplay.innerText + button.innerText;
  inputDisplay.innerText = total;
};
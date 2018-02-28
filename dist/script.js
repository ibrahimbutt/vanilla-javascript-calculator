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
let equalWasPressedLast = false;

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
    equalWasPressedLast = true;
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
  equalWasPressedLast = false;
  if (wasOperatorPressedLast) {
    inputDisplay.innerText = button.innerText;
    wasOperatorPressedLast = false;
  } else if (
    button.value === '00' ||
    button.value === '0' ||
    (button.value === 'decimal' && inputDisplay.innerText === '0') ||
    (inputDisplay.innerText.includes('.') && button.value === 'decimal')
  ) {
    // reject leading 0 and decimals, as well as multiple decimals
    return false;
  } else if (inputDisplay.innerText === '0') {
    inputDisplay.innerText = button.innerText;
  } else {
    inputDisplay.innerText += button.innerText;
  }
};

const onOperatorPress = (button) => {
  wasOperatorPressedLast = true;

  if (inputDisplay.innerText.endsWith('.')) {
    inputDisplay.innerText = inputDisplay.innerText.slice(0, -1);
  }

  if (inputDisplay.innerText === '0') {
    // Reject Leading Operators
    return false;
  } else if (equalWasPressedLast) {
    historyDisplay.innerText += button.innerText;
    lastOperatorPressed = button.value;
    return true;
  } else if (total === '') {
    total = inputDisplay.innerText;
  } else {
    total = calculator[lastOperatorPressed]();
  }
  lastOperatorPressed = button.value;

  historyDisplay.innerText = historyDisplay.innerText + inputDisplay.innerText + button.innerText;
  inputDisplay.innerText = total;
  return true;
};
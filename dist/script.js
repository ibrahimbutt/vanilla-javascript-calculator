/* global
numeral
:true */
/* eslint no-undef: "error" */
/* eslint no-use-before-define: 0 */

// (\d*,)*(\d*)(\.\d+)*$

const inputDiv = document.getElementById('input');
const historyDiv = document.getElementById('history');

const view = {
  total: '',
  addUserInputToInput(value) {
    inputDiv.innerText = numeral(inputDiv.innerText + value).format('0,0');
  },
  addUserInputToHistory(value) {
    if (Number(value)) {
      // Get last input string
      let historyAfterLastOperator = historyDiv.innerText.match(/(\d*,)*\d*$/)[0];
      // Remove commas
      historyAfterLastOperator = historyAfterLastOperator.replace(/,/g, '');
      // Append new value
      historyAfterLastOperator += value;
      // Apply commas
      historyAfterLastOperator = numeral(Number(historyAfterLastOperator)).format('0,0');
      // Remove original input string
      historyDiv.innerText = historyDiv.innerText.replace(/(\d*,)*\d*$/, historyAfterLastOperator);
    } else if (utility.wasOperatorPressedLast()) {
      historyDiv.innerText = historyDiv.innerText.slice(0, -1);
      historyDiv.innerText += value;
    } else {
      historyDiv.innerText += value;
      inputDiv.innerText = '0';
    }
  },
  clearAll() {
    inputDiv.innerText = '0';
    historyDiv.innerText = '';
  },
};

const utility = {
  wasOperatorPressedLast() {
    return !historyDiv.innerText.match(/\d$/);
  },
  digitPressHandler(value) {
    // Is the input 0, as well as the value?
    // Then state is clean, so reject to avoid leading zeros.
    if (inputDiv.innerText === '0' && (value === '0' || value === '00' || value === '.')) {
      return false;
    }
    // Is there a leading zero?
    // If there is, remove it.
    if (inputDiv.innerText === '0' || inputDiv.innerText === '00') {
      inputDiv.innerText = '';
    }
    view.addUserInputToInput(value);
    view.addUserInputToHistory(value);
    return true;
  },
  operatorPressedHandler(value) {
    if (historyDiv.innerText === '') {
      return false;
    }
    view.addUserInputToHistory(value);
    return true;
  },
  operators: ['add', 'subtract', 'divide', 'multiply'],
  operatorsSymbols: ['+', '×', '-', '÷'],
};

document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  const value = e.target.innerText;

  if (Number(value) || value === '0' || value === '00' || value === '.') {
    utility.digitPressHandler(value);
  } else if (utility.operators.includes(e.target.value)) {
    utility.operatorPressedHandler(value);
  } else if (value === 'C') {
    view.clearAll();
  }
});

// Next up, double zero bug

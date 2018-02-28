/* global
numeral
:true */
/* eslint no-undef: "error" */
/* eslint no-use-before-define: 0 */

// (\d*,)*(\d*)(\.\d+)*$
// console.clear();
const inputDiv = document.getElementById('input');
const historyDiv = document.getElementById('history');

const calculator = {
  add(a = 0, b) {
    // return a + b;
    return Number(a) + Number(b);
  },
};

const view = {
  isDigit(value) {
    if (utility.isStateFresh() && (value === '0' || value === '00' || value === '.')) {
      return false;
    } else if ((utility.doesInputIncludeDecimal() || utility.isLastInputOperator()) && value === '.') {
      return false;
    } else if (utility.isLastInputOperator()) {
      inputDiv.innerText = value;
      historyDiv.innerText += value;
    } else if (Number(value) && inputDiv.innerText === '0') {
      inputDiv.innerText = value;
      historyDiv.innerText = value;
    } else if (value === '.' || utility.doesInputIncludeDecimal()) {
      inputDiv.innerText += value;
      historyDiv.innerText += value;
    } else {
      // Add digit to input
      // Format input
      inputDiv.innerText = numeral(inputDiv.innerText + value).format();
      // If operator already present
      // Means, input and history shoudlnt be identical
      // Therefore, need to remove last input from history, add new formatted total input
      if (utility.isOrInludesOperator(historyDiv.innerText)) {
        utility.removeLastInputsFromHistoryTillOperator();
        historyDiv.innerText += inputDiv.innerText;
      } else {
        historyDiv.innerText = inputDiv.innerText;
      }
    }
    return true;
  },
  isOperator(value) {
    if (utility.isStateFresh()) {
      return false;
    } else if (historyDiv.innerText.endsWith('.')) {
      utility.removeLastInputFromHistory();
      inputDiv.innerText = inputDiv.innerText.slice(0, -1);
    } else if (utility.isLastInputOperator()) {
      utility.removeLastInputFromHistory();
    }

    historyDiv.innerText += value;
    return true;
  },
  clearAll() {
    inputDiv.innerText = '0';
    historyDiv.innerText = '';
    calculator.total = '';
  },
};

const utility = {
  isInputNumberOrDecimal(value) {
    return Number(value) || value === '.' || value === '0' || value === '00';
  },
  isOrInludesOperator(value) {
    return !!value.match(/[+×−÷]/);
  },
  isLastInputOperator() {
    return !!historyDiv.innerText.match(/[+×−÷]$/);
  },
  getLastOperatorInHistory() {
    const arrayOfOperatorsInHistory = historyDiv.innerText.match(/[+×−÷]/g);
    const arrayOfOperatorsInHistoryLength = arrayOfOperatorsInHistory.length;
    return arrayOfOperatorsInHistory[arrayOfOperatorsInHistoryLength - 1];
  },
  isStateFresh() {
    return (inputDiv.innerText === '0' && historyDiv.innerText === '');
  },
  removeLastInputsFromHistoryTillOperator() {
    for (let i = historyDiv.innerText.length; !utility.isLastInputOperator(); i -= 1) {
      this.removeLastInputFromHistory();
    }
  },
  doesInputIncludeDecimal() {
    return inputDiv.innerText.includes('.');
  },
  removeLastInputFromHistory() {
    historyDiv.innerText = historyDiv.innerText.slice(0, -1);
  },
  getLastAndCurrentInput() {
    const historyWithoutCommas = historyDiv.innerText.replace(/,/g, '');
    const arrayOfInputs = historyWithoutCommas.match(/\d+?\d*\.?\d*/g);
    const arrayOfInputsLength = arrayOfInputs.length;
    const currentInput = arrayOfInputs[arrayOfInputsLength - 1];
    const lastInput = arrayOfInputs[arrayOfInputsLength - 2];
    return [lastInput, currentInput];
  },
};

document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  const value = e.target.innerText;
  // console.log(utility.isOperator(value));
  if (utility.isInputNumberOrDecimal(value)) {
    view.isDigit(value);
  } else if (utility.isOrInludesOperator(value)) {
    view.isOperator(value);
  } else if (value === 'C') {
    view.clearAll();
  }
});

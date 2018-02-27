// /* global
// numeral
// :true */
/* eslint no-undef: "error" */
/* eslint no-use-before-define: 0 */

// (\d*,)*(\d*)(\.\d+)*$
// console.clear();
const inputDiv = document.getElementById('input');
const historyDiv = document.getElementById('history');

const view = {
  isDigit(value) {
    if (utility.isStateFresh() && (value === '0' || value === '.')) {
      return false;
    } else if (inputDiv.innerText.includes('.') && value === '.') {
      return false;
    } else if (Number(value) && inputDiv.innerText === '0') {
      historyDiv.innerText = value;
      inputDiv.innerText = value;
    } else {
      historyDiv.innerText += value;
      inputDiv.innerText += value;
    }
    return true;
  },
  isOperator(value) {
    if (utility.isStateFresh()) {
      return false;
    } else if (utility.isLastInputOperator()) {
      historyDiv.innerText = historyDiv.innerText.slice(0, -1);
    }
    historyDiv.innerText += value;
    return true;
  },
  clearAll() {
    inputDiv.innerText = '0';
    historyDiv.innerText = '';
  },
};

const utility = {
  isInputNumberOrDecimal(value) {
    return Number(value) || value === '.';
  },
  isInputOperator(value) {
    return !!value.match(/[+×−÷]/);
  },
  isLastInputOperator() {
    return !!historyDiv.innerText.match(/[+×−÷]$/);
  },
  isStateFresh() {
    return (inputDiv.innerText === '0' && historyDiv.innerText === '');
  },
};

document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  const value = e.target.innerText;
  // console.log(utility.isOperator(value));
  if (utility.isInputNumberOrDecimal(value)) {
    view.isDigit(value);
  } else if (utility.isInputOperator(value)) {
    view.isOperator(value);
  } else if (value === 'C') {
    view.clearAll();
  }
});

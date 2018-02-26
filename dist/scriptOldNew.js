const calculator = {
  history: '',
  input: '',
  total: '',
  add: function () {
    return this.total = Number(this.total) + Number(this.input);
  },
  subtract: function () {
    return this.total = Number(this.total) - Number(this.input);
  },
  divide: function () {
    return this.total = Number(this.total) / Number(this.input);
  },
  multiply: function () {
    return this.total = Number(this.total) * Number(this.input);
  },
  equal: function () {
    return this.total;
  },
  wasOperatorPressedLast: function () {
    return !calculator.history.match(/\d$/);
  },
  addToInput: function (value) {
    if (inputDiv.innerText === '0' &&
      (value === '0' || value === '00')) {
      return false;
    } else if (inputDiv.innerText === '0' || this.wasOperatorPressedLast()) {
      inputDiv.innerText = '';
    } 
    this.input += value;
    this.addToUserInputDisplay(value);
  },
  addToUserInputDisplay: function (value) {
    inputDiv.innerText += value;
    inputDiv.innerText = Number(inputDiv.innerText.replace(/,/gi, '')).toLocaleString();
  },
  addToHistory: function (value) {
    if (historyDiv.innerText === '' &&
      (value === '0' || utility.operatorsList.includes(value))) {
      return true;
    }
    if (this.wasOperatorPressedLast() && !Number(value)) {
      this.history = calculator.history.slice(0, -1);
      historyDiv.innerText = this.history;
    }
    this.history += value;
    this.addToUserHistoryDisplay(value);
  },
  addToUserHistoryDisplay: function (value) {
    historyDiv.innerText += value;
  },
  clearAll: function () {
    this.input = '';
    this.history = '';
    inputDiv.innerText = '0';
    historyDiv.innerText = '';
  }
};

const utility = {
  operatorsList: ['÷', '×', '−', '+']
}

// exports.total = calculator.total;

// exports.input = calculator.input;
// exports.addToInput = calculator.addToInput;

// exports.history = calculator.history;
// exports.addToHistory = calculator.addToHistory;

// exports.add = calculator.add;
// exports.subtract = calculator.subtract;
// exports.divide = calculator.divide;
// exports.multiply = calculator.multiply;
// exports.equal = calculator.equal;

const inputDiv = document.getElementById('input');
const historyDiv = document.getElementById('history');

document.getElementById('calculator__bottom').addEventListener('click', function (e) {
  const value = e.target.innerText;
  if (Number(value) >= 0) {
    calculator.addToInput(value);
    calculator.addToHistory(value);
    console.clear();
    console.log('History: ' + calculator.history, 'Input: ' + calculator.input);
    return true;
  } else if (calculator.hasOwnProperty(e.target.value) && value != 'C') {
    calculator.addToHistory(value);
    // calculator.equal();
  } else if (value === 'C') {
    calculator.clearAll();
  }
});


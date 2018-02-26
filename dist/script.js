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
  addToInput: function(value) {
    if (inputDiv.innerText === '0' && value === '0') {
      return false;
    } else if (inputDiv.innerText === '0') {
      inputDiv.innerText = '';
    }
    this.input += value;
    this.addToUserInputDisplay(value);
  },
  addToUserInputDisplay: function(value) {
    inputDiv.innerText += value;
  },
  addToHistory: function(value) {
    if (historyDiv.innerText === '' && value === '0') {
      return false;
    } 
    this.history += value;
    this.addToUserHistoryDisplay(value);
  },
  addToUserHistoryDisplay: function(value) {
    historyDiv.innerText += value;
  },
  clearAll: function () {
    this.input = '';
    this.history = '';
    inputDiv.innerText = '0';
    historyDiv.innerText = '';
  }
};


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


// Cases

// Done
// Should add digits to input, rejecr everything else.
// Should remove leading 0 after first digit input.
// Should clear everything
// Should reject adding multiple leading zeros to history

// In Progress
// Should add digits and operators to history, reject everything else.

// ToDo
// Should show running total when operator pressed.
// Should show total when equal pressed.
// Should add commas correctly
// Should show percent as decimal in history.

const inputDiv = document.getElementById('input');
const historyDiv = document.getElementById('history');

document.getElementById('calculator__bottom').addEventListener('click', function(e) {
  const value = e.target.innerText;
  if (Number(value) >= 0) {
    calculator.addToInput(value);
    // calculator.addToUserInputDisplay(value);
    calculator.addToHistory(value);
    // calculator.addToUserHistoryDisplay(value);
    return true;
  } else if (value === 'C') {
    calculator.clearAll();
  }


})
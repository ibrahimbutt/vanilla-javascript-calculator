const inputDiv = document.getElementById('input');

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
    this.input += value;
    this.addToUserInputDisplay(value);
  },
  addToHistory: function(value) {
    this.history += value;
  },
  addToUserInputDisplay: function(value) {
    if (inputDiv.innerText === '0') {
      inputDiv.innerText = '';
    }
    inputDiv.innerText += value;
  }
};

document.getElementById('calculator__bottom').addEventListener('click', function(e) {
  const value = e.target.innerText;
  if (Number(value) >= 0) {
    calculator.addToInput(value);
    // calculator.addToUserInputDisplay(value);
  }
})

exports.total = calculator.total;

exports.input = calculator.input;
exports.addToInput = calculator.addToInput;

exports.history = calculator.history;
exports.addToHistory = calculator.addToHistory;

exports.add = calculator.add;
exports.subtract = calculator.subtract;
exports.divide = calculator.divide;
exports.multiply = calculator.multiply;
exports.equal = calculator.equal;

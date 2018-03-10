'use strict';

var handlers = {
  store: [],
  operatorPressedLast: false,
  buttonAnimation: function buttonAnimation(button) {
    button.classList.add('active');
    inputDisplay.setAttribute("node-content", inputDisplay.innerText);
    setTimeout(function () {
      button.classList.remove('active');
    }, 750);
  },
  clearAll: function clearAll(button) {
    inputDisplay.innerText = '0';
    this.store = [];
    this.operatorPressedLast = false;
    this.buttonAnimation(button);
  },
  onDigitOrDecimalpress: function onDigitOrDecimalpress(button) {
    inputDisplay.textContent = inputDisplay.textContent.replace(/,/g, '');
    if (inputDisplay.textContent.length >= 9) {
      return false;
    }
    if (inputDisplay.textContent === '0' && button.textContent === '.') {
      inputDisplay.textContent += button.textContent;
    } else if (inputDisplay.textContent === '0' || this.operatorPressedLast || inputDisplay.textContent === '0' && button.textContent === '0') {
      inputDisplay.textContent = button.textContent;
    } else if (button.textContent === '.' && inputDisplay.textContent.includes('.')) {
      this.operatorPressedLast = false;
      return false;
    } else {
      inputDisplay.textContent += button.textContent;
    }
    this.operatorPressedLast = false;
    this.buttonAnimation(button);
  },
  onOperatorPress: function onOperatorPress(button) {
    inputDisplay.textContent = inputDisplay.textContent.replace(/,/g, '');
    if (inputDisplay.textContent === '0') {
      return false;
    } else if (this.operatorPressedLast) {
      this.store.pop();
      this.store.push(button.textContent);
    } else {
      this.store.push(inputDisplay.textContent);
      var userInput = this.store;
      var outputQueue = shuntingYard(userInput);
      this.store = [postfixCalculator(outputQueue)];
      inputDisplay.textContent = this.store[0];
      this.store.push(button.textContent);
      this.operatorPressedLast = true;
    }
    this.buttonAnimation(button);
  },
  onPercentPress: function onPercentPress(button) {
    inputDisplay.textContent = inputDisplay.textContent.replace(/,/g, '');
    inputDisplay.textContent = inputDisplay.textContent / 100;
    this.buttonAnimation(button);
  },
  onPlusMinusPress: function onPlusMinusPress(button) {
    inputDisplay.textContent = inputDisplay.textContent.replace(/,/g, '');
    if (Number(inputDisplay.textContent) > 0) {
      inputDisplay.textContent = inputDisplay.textContent.replace(/[-+]/, '');
      inputDisplay.textContent = '-' + inputDisplay.textContent;
    } else if (Number(inputDisplay.textContent) < 0) {
      inputDisplay.textContent = inputDisplay.textContent.replace(/[-+]/, '');
    }
    this.buttonAnimation(button);
  },
  onEqualPress: function onEqualPress(button) {
    inputDisplay.textContent = inputDisplay.textContent.replace(/,/g, '');
    this.store.push(inputDisplay.textContent);
    var userInput = this.store;
    var outputQueue = shuntingYard(userInput);
    this.store = [postfixCalculator(outputQueue)];
    inputDisplay.textContent = this.store[0];
    this.buttonAnimation(button);
  }
};

var inputDisplay = document.getElementById('calculator__display');

// Operator Map for algorithms
var operatorMap = {
  '^': {
    value: 3,
    association: 'right',
    operate: function operate(leftOperand, rightOperand) {
      return Math.pow(leftOperand, rightOperand);
    }
  },
  '×': {
    value: 3,
    association: 'left',
    operate: function operate(leftOperand, rightOperand) {
      return leftOperand * rightOperand;
    }
  },
  '÷': {
    value: 3,
    association: 'left',
    operate: function operate(leftOperand, rightOperand) {
      return leftOperand / rightOperand;
    }
  },
  '+': {
    value: 2,
    association: 'left',
    operate: function operate(leftOperand, rightOperand) {
      return Number(leftOperand) + Number(rightOperand);
    }
  },
  '-': {
    value: 2,
    association: 'left',
    operate: function operate(leftOperand, rightOperand) {
      return leftOperand - rightOperand;
    }
  },
  '(': {
    value: 5
  },
  ')': {
    value: 5
  }
};

// Shunting Yard Algorithm
// Takes an array as a paramater
var shuntingYard = function shuntingYard(userInput) {
  var outputQueue = [];
  var operatorStack = [];

  var isTopOfStackOperatorPrecedenceGreater = function isTopOfStackOperatorPrecedenceGreater(currentOperator) {
    var value = void 0;
    if (operatorStack.length < 1) {
      value = 0;
    } else {
      value = operatorMap[operatorStack[operatorStack.length - 1]].value;
    }
    return value > operatorMap[currentOperator].value;
  };

  var isTopOfStackOperatorPrecedenceEqualAndSameAssociation = function isTopOfStackOperatorPrecedenceEqualAndSameAssociation(currentOperator) {
    var value = void 0;
    if (operatorStack.length < 1) {
      value = 0;
    } else {
      value = operatorMap[operatorStack[operatorStack.length - 1]].value;
    }
    return value === operatorMap[currentOperator].value && operatorMap[currentOperator].association === 'left';
  };

  var operatorAtTopOfStackIsNotLeftBracket = function operatorAtTopOfStackIsNotLeftBracket() {
    return operatorStack[operatorStack.length - 1] !== '(';
  };

  for (var i = 0; i < userInput.length; i++) {
    var token = userInput[i];
    if (Number(token)) {
      outputQueue.push(token);
    } else if (operatorMap.hasOwnProperty(token) && token !== ')' && token !== '(') {
      while ((isTopOfStackOperatorPrecedenceGreater(token) || isTopOfStackOperatorPrecedenceEqualAndSameAssociation(token)) && operatorAtTopOfStackIsNotLeftBracket()) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorAtTopOfStackIsNotLeftBracket()) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop();
    }
  }

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  return outputQueue;
};

// Postfix Algorithm
var postfixCalculator = function postfixCalculator(outputQueue) {
  var stack = [];
  for (var i = 0; i < outputQueue.length; i++) {
    var token = outputQueue[i];
    if (Number(token)) {
      stack.push(token);
    } else {
      var rightOperand = stack.pop();
      var leftOperand = stack.pop();
      stack.push(operatorMap[token].operate(leftOperand, rightOperand));
    }
  }
  return stack[0];
};
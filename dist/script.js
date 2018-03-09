'use strict';

// Animation Activation
var buttonPop = function buttonPop(button) {
  button.classList.add('active');
  setTimeout(function () {
    button.classList.remove('active');
  }, 750);
};

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

var inputDisplay = document.getElementById('calculator__display');
var store = [];
var operatorPressedLast = false;

document.getElementById('calculator__bottom').addEventListener('click', function (e) {
  var button = e.target;
  buttonPop(button);

  if (Number(button.innerText) && inputDisplay.innerText === '0') {
    inputDisplay.innerText = button.innerText;
  } else if (Number(button.innerText) || button.innerText === '0' || button.innerText === '.' && !inputDisplay.innerText.includes('.')) {
    if (operatorPressedLast) {
      inputDisplay.innerText = button.innerText;
    } else {
      inputDisplay.innerText += button.innerText;
    }
    operatorPressedLast = false;
  } else if (operatorPressedLast) {
    store.pop();
    store.push(button.innerText);
  } else if (operatorMap.hasOwnProperty(button.innerText)) {
    store.push(inputDisplay.innerText);
    var userInput = store;
    var outputQueue = shuntingYard(userInput);
    store = [postfixCalculator(outputQueue)];
    inputDisplay.innerText = store[0];
    store.push(button.innerText);
    operatorPressedLast = true;
  } else if (button.innerText === '%') {
    inputDisplay.innerText /= 100;
  } else if (button.innerText === '+/-') {
    inputDisplay.innerText = '-' + inputDisplay.innerText;
  } else if (button.innerText === '=') {
    store.push(inputDisplay.innerText);
    var _userInput = store;
    var _outputQueue = shuntingYard(_userInput);
    store = [postfixCalculator(_outputQueue)];
    inputDisplay.innerText = store[0];
  } else if (button.innerText === 'AC') {
    inputDisplay.innerText = '0';
    store = [];
    operatorPressedLast = false;
  }

  inputDisplay.setAttribute("node-content", inputDisplay.innerText);
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _operatorMap = require('./operatorMap');

var _operatorMap2 = _interopRequireDefault(_operatorMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Takes an array as a paramater
var shuntingYard = function shuntingYard(userInput) {
  var outputQueue = [];
  var operatorStack = [];

  var isTopOfStackOperatorPrecedenceGreater = function isTopOfStackOperatorPrecedenceGreater(currentOperator) {
    var value = void 0;
    if (operatorStack.length < 1) {
      value = 0;
    } else {
      value = _operatorMap2.default[operatorStack[operatorStack.length - 1]].value;
    }
    return value > _operatorMap2.default[currentOperator].value;
  };

  var isTopOfStackOperatorPrecedenceEqualAndSameAssociation = function isTopOfStackOperatorPrecedenceEqualAndSameAssociation(currentOperator) {
    var value = void 0;
    if (operatorStack.length < 1) {
      value = 0;
    } else {
      value = _operatorMap2.default[operatorStack[operatorStack.length - 1]].value;
    }
    return value === _operatorMap2.default[currentOperator].value && _operatorMap2.default[currentOperator].association === 'left';
  };

  var operatorAtTopOfStackIsNotLeftBracket = function operatorAtTopOfStackIsNotLeftBracket() {
    return operatorStack[operatorStack.length - 1] !== '(';
  };

  for (var i = 0; i < userInput.length; i++) {
    var token = userInput[i];
    if (Number(token)) {
      outputQueue.push(token);
    } else if (_operatorMap2.default.hasOwnProperty(token) && token !== ')' && token !== '(') {
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
}; /* eslint no-plusplus: "off" */
/* eslint comma-dangle: "off" */
/* eslint no-console: "off" */

exports.default = shuntingYard;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _operatorMap = require('./operatorMap');

var _operatorMap2 = _interopRequireDefault(_operatorMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postfixCalculator = function postfixCalculator(outputQueue) {
  var stack = [];
  for (var i = 0; i < outputQueue.length; i++) {
    var token = outputQueue[i];
    if (Number(token)) {
      stack.push(token);
    } else {
      var rightOperand = stack.pop();
      var leftOperand = stack.pop();
      stack.push(_operatorMap2.default[token].operate(leftOperand, rightOperand));
    }
  }
  return stack[0];
}; /* eslint no-plusplus: "off" */
/* eslint comma-dangle: "off" */
/* eslint no-console: "off" */

exports.default = postfixCalculator;
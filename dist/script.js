'use strict';

var _shuntingYard = require('./shuntingYard');

var _shuntingYard2 = _interopRequireDefault(_shuntingYard);

var _postfix = require('./postfix');

var _postfix2 = _interopRequireDefault(_postfix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userInput = ['1', '+', '1'];
var outputQueue = (0, _shuntingYard2.default)(userInput);
var result = (0, _postfix2.default)(outputQueue);

console.log(result);
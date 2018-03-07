import shuntingYard from './shuntingYard';
import postfixCalculator from './postfix';

const userInput = ['1', '+', '11', '*', '53'];
const outputQueue = shuntingYard(userInput);
const result = postfixCalculator(outputQueue);

console.log(result);

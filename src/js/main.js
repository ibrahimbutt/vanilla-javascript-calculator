import { shuntingYard, postfixCalculator } from './calculate';
import view from './view';
import handlers from './handlers';
import state from './state';

const inputDisplay = document.getElementById('calculator__display');

document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  const buttonPressed = e.target.textContent;
  let currentInput = handlers.removeFormatting(inputDisplay.textContent);
  let newInput;

  if (Number(buttonPressed) || buttonPressed === '.' || buttonPressed === '0') {
    newInput = handlers.onDigitPress(currentInput, buttonPressed)
  }
  else if (buttonPressed === '+/-') {
    newInput = handlers.onPlusMinusPress(currentInput);
  } 
  else if (buttonPressed === '%') {
    newInput = handlers.onPercentPress(currentInput);
  } 
  else if (buttonPressed === 'AC') {
    handlers.clearAll(inputDisplay);
    newInput = '0';

  } else if (buttonPressed === '=') {
    newInput = state.store[1] ? handlers.calculateTotal(currentInput) : currentInput;
  }
  else {
    newInput = handlers.onOperatorPress(currentInput, buttonPressed) || currentInput;
  }
  inputDisplay.textContent = handlers.addFormatting(newInput);
  view.buttonAnimation(e.target)
  view.updateChromaticEffect(inputDisplay);
});

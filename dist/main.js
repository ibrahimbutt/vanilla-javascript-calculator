'use strict';

var handlers = {
  removeFormatting: function removeFormatting(input) {
    return input.includes('e') ? Number(input).toString() : input.replace(/,/g, '');
  },
  addFormatting: function addFormatting(input) {
    return input.length > 9 ? Number(input).toExponential().toString() : input.toLocaleString();
  },
  onDigitPress: function onDigitPress(input, buttonPressed) {
    return input + buttonPressed;
  }
};

var view = {
  buttonAnimation: function buttonAnimation(buttonPressed) {
    buttonPressed.classList.add('active');
    setTimeout(function () {
      buttonPressed.classList.remove('active');
    }, 750);
  },
  updateChromaticEffect: function updateChromaticEffect() {
    inputDisplay.setAttribute("node-content", inputDisplay.textContent);
  }
};

var inputDisplay = document.getElementById('calculator__display');

document.getElementById('calculator__bottom').addEventListener('click', function (e) {
  var buttonPressed = e.target.textContent;
  var input = handlers.removeFormatting(inputDisplay.textContent);
  var newInput = void 0;

  if (Number(buttonPressed) || buttonPressed === '.' || buttonPressed === '0') {
    // handlers.onDigitPress(buttonPressed);
    newInput = handlers.onDigitPress(input, buttonPressed);
  }
  // else if (buttonPressed === '+/-') {
  //   handlers.onPlusMinusPress();
  // } else if (buttonPressed === '%') {
  //   handlers.onPercentPress();
  // } else if (buttonPressed === 'AC') {
  //   handlers.clearAll();
  // } else if (buttonPressed === '=') {
  //   handlers.calculateTotal();
  // } else {
  //   handlers.onOperatorPress(buttonPressed);
  // }

  input = handlers.addFormatting(newInput);
  inputDisplay.textContent = input;
  view.buttonAnimation(e.target);
  view.updateChromaticEffect();
});
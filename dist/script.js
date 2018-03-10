'use strict';

var state = {
  store: [],
  operatorLastPressed: false
};

var handlers = {
  onDigitPress: function onDigitPress(buttonPressed) {
    if (inputDisplay.textContent === '0' && buttonPressed !== '.') {
      view.setDisplay(buttonPressed);
    } else if (inputDisplay.textContent === '0' && buttonPressed === '.') {
      // Use set display, to acoid uncessesary steps.
      // More to the point.
      view.setDisplay('0' + buttonPressed);
    } else {
      view.addToDisplay(buttonPressed);
    }
  },
  format: function format(value) {
    if (value.includes(',') && value.replace(/,/g, '').length >= 9) {
      return String(Number(value.replace(/[,]/g, '')).toExponential(2)).replace(/\.00/, '').replace(/\+/, '');
      // console.log(String(Number(value.replace(/,/g, '')).toExponential(2)))
    } else if (Number(value) > 999999999) {
      return String(Number(value).toExponential(2)).replace(/\.00/, '').replace(/\+/, '');
    } else {
      return String(Number(value.replace(/,/g, '')).toLocaleString());
    }
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
  },
  setDisplay: function setDisplay(buttonPressed) {
    inputDisplay.textContent = buttonPressed;
  },
  addToDisplay: function addToDisplay(buttonPressed) {
    var newDisplayText = void 0;
    if (inputDisplay.textContent.includes('e')) {
      newDisplayText = Number(inputDisplay.textContent) + buttonPressed;
    } else {
      newDisplayText = inputDisplay.textContent.replace(/,/g, '') + buttonPressed;
    }
    var newDisplayTextFormatted = handlers.format(newDisplayText);
    this.setDisplay(newDisplayTextFormatted);
  }
};

var inputDisplay = document.getElementById('calculator__display');

document.getElementById('calculator__bottom').addEventListener('click', function (e) {
  var buttonPressed = e.target.textContent;

  if (Number(buttonPressed) || buttonPressed === '.' || buttonPressed === '0') {
    handlers.onDigitPress(buttonPressed);
  }

  view.buttonAnimation(e.target);
  view.updateChromaticEffect();
});
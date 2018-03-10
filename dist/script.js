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
    var inlcudesDecimal = false;
    var afterDecimalPortionOfValue = value.split('').map(function (x) {
      if (x === '.') {
        inlcudesDecimal = true;
        return x;
      } else if (inlcudesDecimal) {
        return x;
      }
    }).join('');

    var valueWithCommas = value
    // Remove portion after decimals
    .replace(/\..*/, '').split('').reverse().map(function (x, i) {
      return i % 3 === 0 ? x + ',' : x;
    }).reverse().join('')
    // Remove extra comma
    .slice(0, -1);

    return valueWithCommas + afterDecimalPortionOfValue;
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
    var newDisplayText = inputDisplay.textContent.replace(/,/g, '') + buttonPressed;
    var newDisplayTextFormatted = handlers.format(newDisplayText);
    this.setDisplay(newDisplayTextFormatted);
  }
};

var inputDisplay = document.getElementById('calculator__display');

document.getElementById('calculator__bottom').addEventListener('click', function (e) {
  var buttonPressed = e.target.textContent;

  if (Number(buttonPressed) || buttonPressed === '.') {
    handlers.onDigitPress(buttonPressed);
  }

  view.updateChromaticEffect();
});
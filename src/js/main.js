import {shuntingYard, postfixCalculator} from './calculate';

const state = {
  operatorLastPressed: false,
  store: []
};

const handlers = {
  clearAll() {
    inputDisplay.innerText = 0;
  },
  removeFormatting(input) {
    return input.includes('e') ?
      Number(input).toString() :
      input.replace(/,/g, '');
  },
  addFormatting(input) {
    return input.length > 9 ?
      Number(input).toExponential().toString() :
      this.addCommas(input);
  },
  addCommas(input) {
    let inlcudesDecimal = false;
    const afterDecimalPortionOfValue = input
      .split('')
      .map((x) => {
        if (x === '.') {
          inlcudesDecimal = true;
          return x;
        } else if (inlcudesDecimal) {
          return x;
        }
      })
      .join('');

    const valueWithCommas = input
      // Remove portion after decimals
      .replace(/\..*/, '')
      .split('')
      .reverse()
      .map((x, i) => {
        return (i % 3 === 0 ? x + ',' : x);
      })
      .reverse()
      .join('')
      // Remove extra comma
      .slice(0, -1);

    return valueWithCommas + afterDecimalPortionOfValue;
  },
  onDigitPress(input, buttonPressed) {
    if (
      (input === '0' && buttonPressed !== '.') ||
      state.operatorLastPressed
    ) {
      state.operatorLastPressed = false;
      return buttonPressed;
    } else if (input === '0' && buttonPressed === '.') {
      state.operatorLastPressed = false;
      return '0.'
    } else if (buttonPressed === '.' && input.includes('.')) {
      return false;
    } else {
      state.operatorLastPressed = false;
      return input + buttonPressed;
    }

  },
  onOperatorPress(input, buttonPressed) {
    if (input === '0') {
      return false;
    } else if (state.operatorLastPressed) {
      state.store.pop();
      state.store.push(buttonPressed);
    } else {
      state.store.push(input);
      const userInput = state.store;
      const outputQueue = shuntingYard(userInput);
      state.store = [postfixCalculator(outputQueue)];
      state.store.push(buttonPressed);
      state.operatorLastPressed = true;
      return state.store[0];
    }
  }
};

const view = {
  buttonAnimation(buttonPressed) {
    buttonPressed.classList.add('active');
    setTimeout(() => {
      buttonPressed.classList.remove('active');
    }, 750);
  },
  updateChromaticEffect() {
    inputDisplay.setAttribute("node-content", inputDisplay.textContent);
  },
}

const inputDisplay = document.getElementById('calculator__display');

document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  // console.log(state.store);
  const buttonPressed = e.target.textContent;
  let currentInput = inputDisplay.textContent.match(/[.e]/g) ?
  handlers.removeFormatting(inputDisplay.textContent) :
  inputDisplay.textContent;
  let newInput;

  if (Number(buttonPressed) || buttonPressed === '.' || buttonPressed === '0') {
    newInput = handlers.onDigitPress(currentInput, buttonPressed)
  }
  // else if (buttonPressed === '+/-') {
  //   handlers.onPlusMinusPress();
  // } else if (buttonPressed === '%') {
  //   handlers.onPercentPress();
  // } else if (buttonPressed === 'AC') {
  //   handlers.clearAll();
  // } else if (buttonPressed === '=') {
  //   handlers.calculateTotal();
  // }
  else {
    newInput = handlers.onOperatorPress(currentInput, buttonPressed) || currentInput;
  }
  // console.log(newInput);
console.log(state.store);
  inputDisplay.textContent = handlers.addFormatting(newInput);
  view.buttonAnimation(e.target)
  view.updateChromaticEffect();
});

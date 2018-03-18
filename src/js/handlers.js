import state from './state';
import { shuntingYard, postfixCalculator } from './calculate';

const handlers = {
  clearAll(inputDisplay) {
    inputDisplay.innerText = 0;
    state.store = []
    state.operatorLastPressed = false;
  },
  removeFormatting(input) {
    return input.includes('e') ?
      Number(input).toString() :
      input.replace(/,/g, '');
  },
  addFormatting(input) {
    return input > 999999999 ?
      Number(input).toExponential(2).toString() :
      this.addCommas(input);
  },
  addCommas(input) {
    let inlcudesDecimal = false;
    let afterDecimalPortionOfValue;
    if (input.includes('.')) {
      afterDecimalPortionOfValue = input
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

      afterDecimalPortionOfValue = afterDecimalPortionOfValue === '.' ?
        '.' :
        Number(afterDecimalPortionOfValue).toFixed(
          afterDecimalPortionOfValue.length > 2 ? 2 : 1
        ).toString().replace(/^0/, '');
    }

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

    return valueWithCommas + (afterDecimalPortionOfValue || '')
  },
  onDigitPress(input, buttonPressed) {
    if (
      (input === '0' && buttonPressed !== '.') ||
      state.operatorLastPressed
    ) {
      state.operatorLastPressed = false;
      return buttonPressed;
    } else if (input === '0' && buttonPressed === '.') {
      console.log(123)
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
  },
  onPlusMinusPress(input) {
    return input > 0 ? '-' + input : input.replace(/^-/, '');
  },
  onPercentPress(input) {
    return (input / 100).toString();
  },
  calculateTotal(input) {
    state.store.push(input);
    console.log(state.store)
    const userInput = state.store;
    const outputQueue = shuntingYard(userInput);
    state.store = [postfixCalculator(outputQueue)];
    state.operatorLastPressed = true;
    console.log(state.store[0])
    return state.store[0];
  }
};

export default handlers;
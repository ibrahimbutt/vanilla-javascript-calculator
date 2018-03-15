import calculate from "./calculate";

const state = {
  operatorLastPressed: false
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
      return buttonPressed;
    } else if (input === '0' && buttonPressed === '.') {
      return '0.'
    } else {
      return input + buttonPressed;
    }

    state.operatorLastPressed = false;
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
  const buttonPressed = e.target.textContent;
  let input = handlers.removeFormatting(inputDisplay.textContent);
  let newInput;

  if (Number(buttonPressed) || buttonPressed === '.' || buttonPressed === '0') {
    newInput = handlers.onDigitPress(input, buttonPressed)
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
  view.buttonAnimation(e.target)
  view.updateChromaticEffect();
  console.log(input)
});

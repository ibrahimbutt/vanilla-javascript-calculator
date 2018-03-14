const handlers = {
  removeFormatting(input) {
    return input.includes('e') ?
      Number(input).toString() :
      input.replace(/,/g, '');
  },
  addFormatting(input) {
    return input.length > 9 ?
      Number(input).toExponential().toString() :
      input.toLocaleString();
  },
  onDigitPress(input, buttonPressed) {
    return input + buttonPressed;
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
    // handlers.onDigitPress(buttonPressed);
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
});

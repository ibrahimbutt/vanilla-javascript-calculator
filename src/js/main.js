import calculate from "./calculate";

const thiss = ['1', '+', '2'];
console.log(1123);

const state = {
  store: [],
  operatorLastPressed: false
};

const handlers = {
  onDigitPress(buttonPressed) {
    if (
      (inputDisplay.textContent === '0' && buttonPressed !== '.') ||
      state.operatorLastPressed
    ) {
      view.setDisplay(buttonPressed);
    } else if (inputDisplay.textContent === '0' && buttonPressed === '.') {
      // Use set display, to acoid uncessesary steps in addToDisplay().
      // More to the point.
      view.setDisplay('0' + buttonPressed);
    } else if (inputDisplay.textContent.includes('.') && buttonPressed === '.') {
      return false;
    } else if (buttonPressed === '.') {
      // toLocaleString will remove decimal
      // E.g. if inputDisplay is 56 button press is a decimal
      // format() will remove trailing decimal point.
      view.setDisplay( inputDisplay.textContent + buttonPressed);
    } else {
      view.addToDisplay(buttonPressed);
    }
    state.operatorLastPressed = false;
  },
  onOperatorPress(buttonPressed) {
    if (inputDisplay.textContent === '0') {
      return false;
    } else if (state.operatorLastPressed) {
      state.store.pop();
      state.store.push(buttonPressed);
    } else {
      this.calculateTotal();
      state.store.push(buttonPressed)
    }
    state.operatorLastPressed = true;
  },
  format(value) {
    if (value.includes(',') && value.replace(/,/g, '').length >= 9) {
      return String(Number(value.replace(/[,]/g, '')).toExponential(3)).replace(/\+/, '');
    } else if (Number(value) > 999999999) {
      return String(Number(value).toExponential(3)).replace(/\+/, '');
    } else {
      return String(Number(value.replace(/,/g, '')).toLocaleString());
    }
  },
  onPlusMinusPress() {
    (Number(inputDisplay.textContent.replace(/,/g, '')) > 0 ?
      view.setDisplay('-' + inputDisplay.textContent) :
      view.setDisplay(inputDisplay.textContent.replace(/-/, '')));
  },
  onPercentPress() {
    view.setDisplay(
      this.format(String(inputDisplay.textContent.replace(/,/g, '') / 100))
    );
  },
  calculateTotal() {
    state.store.push(String(Number(inputDisplay.textContent.replace(/,/g, ''))));
    const outputQueue = shuntingYard(state.store);
    state.store = [postfixCalculator(outputQueue)];
    view.setDisplay(state.store[0])
  },
  clearAll() {
    state.store = [];
    state.operatorLastPressed = false;
    view.setDisplay('0');
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
  setDisplay(buttonPressed) {
    inputDisplay.textContent = buttonPressed;
  },
  addToDisplay(buttonPressed) {
    let newDisplayText = (inputDisplay.textContent.includes('e') ?
      Number(inputDisplay.textContent) + buttonPressed :
      inputDisplay.textContent.replace(/,/g, '') + buttonPressed);
    const newDisplayTextFormatted = handlers.format(newDisplayText)
    this.setDisplay(newDisplayTextFormatted);
  }
};

const inputDisplay = document.getElementById('calculator__display');

document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  const buttonPressed = e.target.textContent;

  if (Number(buttonPressed) || buttonPressed === '.' || buttonPressed === '0') {
    handlers.onDigitPress(buttonPressed);
  } else if (buttonPressed === '+/-') {
    handlers.onPlusMinusPress();
  } else if (buttonPressed === '%') {
    handlers.onPercentPress();
  } else if (buttonPressed === 'AC') {
    handlers.clearAll();
  } else if (buttonPressed === '=') {
    handlers.calculateTotal();
  } else {
    handlers.onOperatorPress(buttonPressed);
  }

  handlers.format(inputDisplay.textContent);
  view.buttonAnimation(e.target)
  view.updateChromaticEffect();
});


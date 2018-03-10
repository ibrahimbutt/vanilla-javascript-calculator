const state = {
  store: [],
  operatorLastPressed: false
};

const handlers = {
  onDigitPress(buttonPressed) {
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
  format(value) {
    let inlcudesDecimal = false;
    const afterDecimalPortionOfValue = value
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

    const valueWithCommas = value
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
    const newDisplayText = inputDisplay.textContent.replace(/,/g, '') + buttonPressed;
    const newDisplayTextFormatted = handlers.format(newDisplayText)
    this.setDisplay(newDisplayTextFormatted);
  }
};

const inputDisplay = document.getElementById('calculator__display');

document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  const buttonPressed = e.target.textContent;

  if (Number(buttonPressed) || buttonPressed === '.') {
    handlers.onDigitPress(buttonPressed);
  }

  view.updateChromaticEffect();
});
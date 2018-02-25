const calculator = {
  history: document.getElementById('history'),
  input: document.getElementById('input'),
  calculatorBottom: document.getElementById('calculator__bottom')
};

const handlers = {
  wasOperatorPressed: function () {
    return !calculator.history.innerText.match(/\d$/);
  }
}

const view = {
  addCharacterToDestination: (character, destOne, destTwo) => {
    destOne.innerText += character;
    if (destTwo) {
      destTwo.innerText += character;
    }
  },
  operatorPressed: function (character, destOne, destTwo) {
    this.calculateTotal();
    this.addCharacterToDestination(character, destOne, destTwo);
  },
  digitPressed: function (character, destOne, destTwo) {
    if (destOne.innerText === '0') {
      destOne.innerText = '';
    }
    if (handlers.wasOperatorPressed()) {
      calculator.input.innerText = '';
    }
    this.addCharacterToDestination(character, destOne, destTwo)
  },
  calculateTotal: () => {
    let evalString = calculator.history.innerText;
    evalString = evalString.replace(/÷/g, '/');
    evalString = evalString.replace(/×/g, '*');
    evalString = evalString.replace(/×/g, '*');
    input.innerText = eval(evalString).toFixed(0);
  },
  clearAll: () => {
    calculator.history.innerText = '';
    calculator.input.innerText = '0';
  }
};

calculator.calculatorBottom.addEventListener('click', (e) => {
  const character = e.target.innerText;

  if (Number(character)) {
    view.digitPressed(character, calculator.input, calculator.history);
  }
  else if (character != 'C' && character != '=') {
    if (handlers.wasOperatorPressed()) {
      calculator.history.innerText = calculator.history.innerText.slice(0, -1);
    }
    view.operatorPressed(character, calculator.history);
  } else if (character === '=') {
    view.calculateTotal();
  } else if (character === 'C') {
    view.clearAll();
  } else if (character === '=') {
    view.calculateTotal();
  }
});


// Cases

// 01. Should add digits to input, rejecr everything else.
// 02. Should add digits and operators to history, reject everything else.
// 03. Should remove leading 0 after first digit input.
// 04. Should show current total when operator pressed.
// 05. Should show total when equal pressed.
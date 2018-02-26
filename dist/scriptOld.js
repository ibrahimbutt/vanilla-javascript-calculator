const calculator = {
  history: document.getElementById('history'),
  input: document.getElementById('input'),
  calculatorTop: document.getElementById('calculator__top'),
  calculatorBottom: document.getElementById('calculator__bottom')
};

const handlers = {
  wasOperatorPressed: function () {
    return !calculator.history.innerText.match(/\d$/);
  },
  percentagePressed: function () {
    // Get last digits pressed

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

    // Avoid error in console
    if (calculator.history.innerText === '') {
      return false;
    }

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
    this.addCharacterToDestination(character, destOne, destTwo);
    const commasRemoved = calculator.input.innerText.replace(/,/gi, '');
    calculator.input.innerText = Number(commasRemoved).toLocaleString();
  },
  calculateTotal: () => {
    let evalString = calculator.history.innerText;
    evalString = evalString.replace(/÷/g, '/');
    evalString = evalString.replace(/×/g, '*');
    evalString = evalString.replace(/−/g, '-');
    calculator.input.innerText = eval(evalString).toLocaleString();
  },
  clearAll: () => {
    calculator.history.innerText = '';
    calculator.input.innerText = '0';
  }
};

calculator.calculatorBottom.addEventListener('click', (e) => {
  const character = e.target.innerText;

  if (Number(character) >= 0) {
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
  } 
});


// Cases

// Done
// 01. Should add digits to input, rejecr everything else.
// 02. Should add digits and operators to history, reject everything else.
// 03. Should remove leading 0 after first digit input.
// 04. Should show running total when operator pressed.
// 05. Should show total when equal pressed.
// 06. Should add commas correctly

// ToDo
// Should reset input if clear pressed once
// Should reset calculator if clear pressed twice
// Should reject adding multiple leading zeros to history
// Should show percent as decimal in history.
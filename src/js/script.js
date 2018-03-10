const handlers = {
  store: [],
  operatorPressedLast: false,
  buttonAnimation(button) {
    button.classList.add('active');
    inputDisplay.setAttribute("node-content", inputDisplay.innerText);
    setTimeout(() => {
      button.classList.remove('active');
    }, 750);
  },
  clearAll(button) {
    inputDisplay.innerText = '0';
    this.store = [];
    this.operatorPressedLast = false;
    this.buttonAnimation(button);
  },
  onDigitOrDecimalpress(button) {
    inputDisplay.textContent = inputDisplay.textContent.replace(/,/g, '');
    if (inputDisplay.textContent.length >= 9) {
      inputDisplay.textContent = Number(inputDisplay.textContent).toLocaleString('en-US');
      return false;
    }
    if (inputDisplay.textContent === '0' && button.textContent === '.') {
      inputDisplay.textContent += button.textContent;
    } else if (inputDisplay.textContent === '0' ||
      this.operatorPressedLast ||
      (inputDisplay.textContent === '0' && button.textContent === '0')
    ) {
      inputDisplay.textContent = button.textContent;
    } else if (button.textContent === '.' && inputDisplay.textContent.includes('.')) {
      this.operatorPressedLast = false;
      return false;
    } else {
      inputDisplay.textContent += button.textContent;
    }
    inputDisplay.textContent = Number(inputDisplay.textContent).toLocaleString('en-US');
    this.operatorPressedLast = false;
    this.buttonAnimation(button);
  },
  onOperatorPress(button) {
    inputDisplay.textContent = inputDisplay.textContent.replace(/,/g, '');
    if (inputDisplay.textContent === '0') {
      return false;
    }
    else if (this.operatorPressedLast) {
      this.store.pop();
      this.store.push(button.textContent);
    } else {
      this.store.push(inputDisplay.textContent);
      const userInput = this.store;
      const outputQueue = shuntingYard(userInput);
      this.store = [postfixCalculator(outputQueue)];
      inputDisplay.textContent = this.store[0];
      this.store.push(button.textContent);
      this.operatorPressedLast = true;
    }
    inputDisplay.textContent = Number(inputDisplay.textContent).toLocaleString('en-US');
    this.buttonAnimation(button);
  },
  onPercentPress(button) {
    inputDisplay.textContent = inputDisplay.textContent.replace(/,/g, '');
    inputDisplay.textContent = inputDisplay.textContent / 100;
    this.buttonAnimation(button);
  },
  onPlusMinusPress(button) {
    inputDisplay.textContent = inputDisplay.textContent.replace(/,/g, '');
    if (Number(inputDisplay.textContent) > 0) {
      inputDisplay.textContent = inputDisplay.textContent.replace(/[-+]/, '');
      inputDisplay.textContent = '-' + inputDisplay.textContent;
    } else if (Number(inputDisplay.textContent) < 0) {
      inputDisplay.textContent = inputDisplay.textContent.replace(/[-+]/, '');
    }
    inputDisplay.textContent = Number(inputDisplay.textContent).toLocaleString('en-US');
    this.buttonAnimation(button);
  },
  onEqualPress(button) {
    inputDisplay.textContent = inputDisplay.textContent.replace(/,/g, '');
    this.store.push(inputDisplay.textContent);
    const userInput = this.store;
    const outputQueue = shuntingYard(userInput);
    this.store = [postfixCalculator(outputQueue)];
    inputDisplay.textContent = this.store[0];
    inputDisplay.textContent = Number(inputDisplay.textContent).toLocaleString('en-US');
    this.buttonAnimation(button);
  }
}

const inputDisplay = document.getElementById('calculator__display');

// Operator Map for algorithms
const operatorMap = {
  '^': {
    value: 3,
    association: 'right',
    operate(leftOperand, rightOperand) {
      return leftOperand ** rightOperand;
    }
  },
  '×': {
    value: 3,
    association: 'left',
    operate(leftOperand, rightOperand) {
      return leftOperand * rightOperand;
    }
  },
  '÷': {
    value: 3,
    association: 'left',
    operate(leftOperand, rightOperand) {
      return leftOperand / rightOperand;
    }
  },
  '+': {
    value: 2,
    association: 'left',
    operate(leftOperand, rightOperand) {
      return Number(leftOperand) + Number(rightOperand);
    }
  },
  '-': {
    value: 2,
    association: 'left',
    operate(leftOperand, rightOperand) {
      return leftOperand - rightOperand;
    }
  },
  '(': {
    value: 5
  },
  ')': {
    value: 5
  }
};

// Shunting Yard Algorithm
// Takes an array as a paramater
const shuntingYard = (userInput) => {
  const outputQueue = [];
  const operatorStack = [];

  const isTopOfStackOperatorPrecedenceGreater = (currentOperator) => {
    let value;
    if (operatorStack.length < 1) {
      value = 0;
    } else {
      value = operatorMap[operatorStack[operatorStack.length - 1]].value;
    }
    return value > operatorMap[currentOperator].value;
  };

  const isTopOfStackOperatorPrecedenceEqualAndSameAssociation = (currentOperator) => {
    let value;
    if (operatorStack.length < 1) {
      value = 0;
    } else {
      value = operatorMap[operatorStack[operatorStack.length - 1]].value;
    }
    return (value === operatorMap[currentOperator].value &&
      operatorMap[currentOperator].association === 'left');
  };

  const operatorAtTopOfStackIsNotLeftBracket = () => (
    operatorStack[operatorStack.length - 1] !== '('
  );

  for (let i = 0; i < userInput.length; i++) {
    const token = userInput[i];
    if (Number(token)) {
      outputQueue.push(token);
    } else if (
      (operatorMap.hasOwnProperty(token) &&
        token !== ')' && token !== '(')
    ) {
      while (
        (isTopOfStackOperatorPrecedenceGreater(token) ||
          isTopOfStackOperatorPrecedenceEqualAndSameAssociation(token))
        && operatorAtTopOfStackIsNotLeftBracket()
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorAtTopOfStackIsNotLeftBracket()) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop();
    }
  }

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  return outputQueue;
};

// Postfix Algorithm
const postfixCalculator = (outputQueue) => {
  const stack = [];
  for (let i = 0; i < outputQueue.length; i++) {
    const token = outputQueue[i];
    if (Number(token)) {
      stack.push(token);
    } else {
      const rightOperand = stack.pop();
      const leftOperand = stack.pop();
      stack.push(operatorMap[token].operate(leftOperand, rightOperand));
    }
  }
  return stack[0];
};
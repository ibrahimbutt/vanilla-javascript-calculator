// Animation Activation
const buttonPop = (button) => {
  button.classList.add('active');
  inputDisplay.setAttribute("node-content", inputDisplay.innerText);
  setTimeout(() => {
    button.classList.remove('active');
  }, 750);
};

const handlers = {
  store: [],
  operatorPressedLast: false,
  clearAll(button) {
    inputDisplay.innerText = '0';
    this.store = [];
    this.operatorPressedLast = false;
    buttonPop(button);
  },
  onDigitOrDecimalpress(button) {
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
    this.operatorPressedLast = false;
    buttonPop(button);
  },
  onOperatorPress(button) {
    if (this.operatorPressedLast) {
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
    buttonPop(button);
  },
  onPercentPress(button) {
    inputDisplay.textContent = inputDisplay.textContent / 100;
    buttonPop(button);
  },
  onEqualPress(button) {
    this.store.push(inputDisplay.textContent);
    const userInput = this.store;
    const outputQueue = shuntingYard(userInput);
    this.store = [postfixCalculator(outputQueue)];
    inputDisplay.textContent = this.store[0];
    buttonPop(button);
  }
}

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

const inputDisplay = document.getElementById('calculator__display');
// let store = [];
// let operatorPressedLast = false;

// document.getElementById('calculator__bottom').addEventListener('click', (e) => {
//   let button = e.target
//   buttonPop(button);

//   if (Number(button.innerText) && inputDisplay.innerText === '0') {
//     inputDisplay.innerText = button.innerText;
//   } else if (Number(button.innerText) || button.innerText === '0' ||
//     (button.innerText === '.' && !inputDisplay.innerText.includes('.'))) {
//     if (operatorPressedLast) {
//       inputDisplay.innerText = button.innerText;
//     } else {
//       inputDisplay.innerText += button.innerText;
//     }
//     operatorPressedLast = false;
//   } else if (operatorPressedLast) {
//     store.pop();
//     store.push(button.innerText);
//   } else if (operatorMap.hasOwnProperty(button.innerText)) {
//     store.push(inputDisplay.innerText);
//     const userInput = store;
//     const outputQueue = shuntingYard(userInput);
//     store = [postfixCalculator(outputQueue)];
//     inputDisplay.innerText = store[0];
//     store.push(button.innerText);
//     operatorPressedLast = true;
//   } else if (button.innerText === '%') {
//     inputDisplay.innerText /= 100;
//   } else if (button.innerText === '+/-') {
//     inputDisplay.innerText = '-' + inputDisplay.innerText;
//   } else if (button.innerText === '=') {
//     store.push(inputDisplay.innerText);
//     const userInput = store;
//     const outputQueue = shuntingYard(userInput);
//     store = [postfixCalculator(outputQueue)];
//     inputDisplay.innerText = store[0];
//   } 

//   inputDisplay.setAttribute("node-content", inputDisplay.innerText);
// });
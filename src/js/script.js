// Animation Activation
const buttonPop = (button) => {
  button.classList.add('active');
  setTimeout(() => {
    button.classList.remove('active');
  }, 750);
};

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
let store = [];
let operatorPressedLast = false;

document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  let button = e.target
  buttonPop(button);
  // console.log(button.getAttribute("node-content"));

  if (Number(button.innerText) && inputDisplay.innerText === '0') {
    inputDisplay.innerText = button.innerText;
    // inputDisplay.setAttribute("node-content", button.innerText);
  } else if (Number(button.innerText)) {
    if (operatorPressedLast) {
      inputDisplay.innerText = button.innerText;
    } else {
      inputDisplay.innerText += button.innerText;
    }
    // inputDisplay.setAttribute("node-content", inputDisplay.innerText);
    operatorPressedLast = false;
  } else {
    if (operatorPressedLast) {
      store.pop()
      store.push(button.getAttribute("node-content"));
    } else if (operatorMap.hasOwnProperty(button.getAttribute("node-content"))) {
      store.push(inputDisplay.innerText);
      const userInput = store;
      const outputQueue = shuntingYard(userInput);
      store = [postfixCalculator(outputQueue)];
      inputDisplay.innerText = store[0];
      store.push(button.getAttribute("node-content"));
      // inputDisplay.setAttribute("node-content", inputDisplay.innerText);
      operatorPressedLast = true;
    } else if (button.getAttribute("node-content") === '%') {
      inputDisplay.innerText /= 100;
    } else if (button.getAttribute("node-content") === 'AC') {
      inputDisplay.innerText = '0';
      // inputDisplay.setAttribute("node-content", inputDisplay.innerText);
      store = [];
      operatorPressedLast = false;
    }
  }
  inputDisplay.setAttribute("node-content", inputDisplay.innerText);
});
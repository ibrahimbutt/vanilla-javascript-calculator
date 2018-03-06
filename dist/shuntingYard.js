const outputQueue = [];
const operatorStack = [];
// const userInput = ['3', '^', '4', '/', '(', '5', '*', '6', ')', '+', '1'];

const precedenceMap = {
  '^': {
    value: 3,
    association: 'right'
  },
  '*': {
    value: 3,
    association: 'left'
  },
  '/': {
    value: 3,
    association: 'left'
  },
  '+': {
    value: 2,
    association: 'left'
  },
  '-': {
    value: 2,
    association: 'left'
  },
  '(': {
    value: 5
  },
  ')': {
    value: 5
  }
};

const isTopOfStackOperatorPrecedenceGreater = (currentOperator) => {
  let value;
  if (operatorStack.length < 1) {
    value = 0;
  } else {
    value = precedenceMap[operatorStack[operatorStack.length - 1]].value;
  }
  return value > precedenceMap[currentOperator].value;
};

const isTopOfStackOperatorPrecedenceEqualAndSameAssociation = (currentOperator) => {
  let value;
  if (operatorStack.length < 1) {
    value = 0;
  } else {
    value = precedenceMap[operatorStack[operatorStack.length - 1]].value;
  }
  return (value === precedenceMap[currentOperator].value &&
    precedenceMap[currentOperator].association === 'left');
};

const operatorAtTopOfStackIsNotLeftBracket = () => (
  operatorStack[operatorStack.length - 1] !== '('
);

const shuntingYard = (userInput) => {
  for (let i = 0; i < userInput.length; i++) {
    const token = userInput[i];
    if (Number(token)) {
      outputQueue.push(token);
    } else if (
      (precedenceMap.hasOwnProperty(token) &&
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

export default shuntingYard;

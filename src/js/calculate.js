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

const shuntingYard = (userInput) => {
  const outputQueue = [];
  const operatorStack = [];

  const isTopOfStackOperatorPrecedenceGreater = (currentOperator) => {
    const value = operatorStack.length < 1 ?
      0 : operatorMap[operatorStack[operatorStack.length - 1]].value;
    return value > operatorMap[currentOperator].value;
  };

  const isTopOfStackOperatorPrecedenceEqualAndSameAssociation = (currentOperator) => {
    const value = operatorStack.length < 1 ?
      0 : operatorMap[operatorStack[operatorStack.length - 1]].value;
    return (value === operatorMap[currentOperator].value &&
      operatorMap[currentOperator].association === 'left');
  };

  const operatorAtTopOfStackIsNotLeftBracket = () => (
    operatorStack[operatorStack.length - 1] !== '('
  );

  userInput.forEach((token) => {
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
  });

  operatorStack.forEach(() => {
    outputQueue.push(operatorStack.pop());
  });

  return outputQueue;
};

const postfixCalculator = (outputQueue) => {
  const stack = [];
  outputQueue.forEach((token) => {
    if (Number(token)) {
      stack.push(token);
    } else {
      const rightOperand = stack.pop();
      const leftOperand = stack.pop();
      stack.push(operatorMap[token].operate(leftOperand, rightOperand));
    }
  });
  return stack[0].toString();
};

export {shuntingYard, postfixCalculator};
import operatorMap from './operatorMap';

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

export default postfixCalculator;

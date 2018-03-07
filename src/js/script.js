// import shuntingYard from './shuntingYard';
// import postfixCalculator from './postfix';

// const userInput = ['1', '+', '11', '*', '53'];
// const outputQueue = shuntingYard(userInput);
// const result = postfixCalculator(outputQueue);


const inputDisplay = document.getElementById('calculator__display');

document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  let button = e.target
  console.log(button)

  if (Number(button.innerText) && inputDisplay.innerText === '0') {
    inputDisplay.innerText = button.innerText;
    inputDisplay.setAttribute("node-content", button.innerText);
  } else if (Number(button.innerText)) {
    inputDisplay.innerText += button.innerText;
    inputDisplay.setAttribute("node-content", inputDisplay.innerText);    
  }
});
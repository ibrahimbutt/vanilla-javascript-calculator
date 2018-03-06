// /* global
// numeral
// :true */
/* eslint no-undef: "error" */
/* eslint no-use-before-define: 0 */

let inputDisplay = document.getElementById('input');
// let historyDisplay = document.getElementById('history');


// const clearAll = (button) => {
//   button.childNodes[1].classList.add('active');
//   button.classList.add('active');
//   setTimeout(() => {
//     button.childNodes[1].classList.remove('active');
//     button.classList.remove('active');
//   }, 750);
// };

const onDigitPress = (button) => {
  console.log(button)
  if (inputDisplay.innerText === '0') {
    inputDisplay.innerText = '';
  }
  inputDisplay.innerText += button.attributes.value.value;
  button.childNodes[1].classList.add('active');
  button.classList.add('active');

  setTimeout(() => {
    button.childNodes[1].classList.remove('active');
    button.classList.remove('active');
  }, 750);
};

// const onOperatorPress = (button) => {
//   button.childNodes[1].classList.add('active');
//   button.classList.add('active');

//   setTimeout(() => {
//     button.childNodes[1].classList.remove('active');
//     button.classList.remove('active');
//   }, 750);
// };

// /* global
// numeral
// :true */
/* eslint no-undef: "error" */
/* eslint no-use-before-define: 0 */

let inputDisplay = document.getElementById('input');
let historyDisplay = document.getElementById('history');
const buttonsSection = document.getElementById('calculator__bottom');

buttonsSection.addEventListener('click', (event) => {
  const buttonValue = event.target.value;
  const buttonText = event.target.innerText;

});
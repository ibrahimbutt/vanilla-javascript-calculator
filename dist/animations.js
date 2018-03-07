'use strict';

var buttonPop = function buttonPop(e) {
  var button = e.target;
  console.log(button);
  button.classList.add('active');
  setTimeout(function () {
    button.classList.remove('active');
  }, 750);
};

document.getElementById('calculator__bottom').addEventListener('click', function (e) {
  console.log('hello');
  buttonPop(e);
});
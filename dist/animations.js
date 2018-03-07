'use strict';

var buttonPop = function buttonPop(e) {
  var button = void 0;
  if (e.target.className === 'button') {
    button = e.target;
  } else {
    button = e.target.parentElement;
  }

  button.classList.add('active');
  setTimeout(function () {
    button.classList.remove('active');
  }, 750);
};

document.getElementById('calculator__bottom').addEventListener('click', function (e) {
  buttonPop(e);
});
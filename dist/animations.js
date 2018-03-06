document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  let button;
  if (e.target.className === 'button') {
    button = e.target;
  } else {
    button = e.target.parentElement;
  }

  button.classList.add('active');
  setTimeout(() => {
    button.classList.remove('active');
  }, 750);
});
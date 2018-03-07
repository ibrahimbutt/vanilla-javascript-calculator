const buttonPop = (e) => {
  let button = e.target;
  console.log(button)
  button.classList.add('active');
  setTimeout(() => {
    button.classList.remove('active');
  }, 750);
};

document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  console.log('hello');
  buttonPop(e);
});


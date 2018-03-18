const view = {
  buttonAnimation(buttonPressed) {
    buttonPressed.classList.add('active');
    setTimeout(() => {
      buttonPressed.classList.remove('active');
    }, 750);
  },
  updateChromaticEffect(inputDisplay) {
    inputDisplay.setAttribute("node-content", inputDisplay.textContent);
  },
}

export default view;
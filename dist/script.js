let inputDiv = document.getElementById('input');
let historyDiv = document.getElementById('history');

const view = {
  total: '',
  addUserInputToInput(value) {
    inputDiv.innerText += value;
    inputDiv.innerText = Number(inputDiv.innerText.replace(/,/gi, '')).toLocaleString();
  },
  addUserInputToHistory(value) {

    // Get last input string from history
    // Remove commas
    // Apply new value
    // Reapply commas
    // Add to history
    if (!!historyDiv.innerText.match(/[+×-÷]/g)) {
      let lastInput = historyDiv.innerText.match(/(\d*,)*\d*$/)[0];
      lastInput = lastInput.replace(/,/gi, '');
      lastInput += value;
      lastInput = Number(lastInput).toLocaleString();
      historyDiv.innerText = historyDiv.innerText.replace(/(\d*,)*\d*$/, String(lastInput));
    } else {
      historyDiv.innerText += value;
      historyDiv.innerText = Number(historyDiv.innerText.replace(/,/gi, '')).toLocaleString();
    }
  },
  clearAll() {
    inputDiv.innerText = '0';
    historyDiv.innerText = '';
  },
};

const utility = {
  // wasOperatorPressedLast () {
  //   // return !calculator.history.match(/\d$/);
  // }
  digitPressHandler(value) {
    // Is the input 0, as well as the value?
    // Then state is clean, so reject to avoid leading zeros.
    if (inputDiv.innerText === '0' && (value === '0' || value === '00')) {
      return false;
    }

    // Is there a leading zero?
    // If there is, remove it.
    if (inputDiv.innerText === '0' || inputDiv.innerText === '00') {
      inputDiv.innerText = '';
    }
    view.addUserInputToInput(value);
    view.addUserInputToHistory(value);
    return true;
  },
};

document.getElementById('calculator__bottom').addEventListener('click', (e) => {
  const value = e.target.innerText;
  if (Number(value) || value === '0' || value === '00') {
    utility.digitPressHandler(value);
  } else if (value === 'C') {
    view.clearAll();
  }
});

// inputDiv.innerText += value;
//     inputDiv.innerText = Number(inputDiv.innerText.replace(/,/gi, '')).toLocaleString();
/* global
describe
beforeEach
view
it
expect
:true */
/* eslint no-undef: "error" */


const input = document.getElementById('input');
const history = document.getElementById('history');

describe('Edge Cases', () => {
  beforeEach(() => {
    view.clearAll();
  });

  it('Should display 0 as default on load.', () => {
    expect(input.innerText).to.equal('0');
  });

  it('Should remove leading 0 on user input.', () => {
    document.querySelectorAll("[value='1']")[0].click();
    expect(input.innerText).to.equal('1');
  });

  it('Should reject adding a leading operator to history.', () => {
    document.querySelectorAll("[value='add']")[0].click();
    expect(history.innerText).to.equal('');
  });

  it('Should remove previous operator, if another pressed right after.', () => {
    history.innerText = '1';
    document.querySelectorAll("[value='subtract']")[0].click();
    document.querySelectorAll("[value='add']")[0].click();
    expect(history.innerText).to.equal('1+');
  });

  it('Should only add digits to input.', () => {
    const nonDigitButtons = document.getElementsByClassName('TC-not-digit');
    Object.values(nonDigitButtons).forEach((button) => {
      button.click();
    });
    expect(input.innerText).to.equal('0');

    const digitButtons = document.getElementsByClassName('TC-is-digit');
    Object.values(digitButtons).forEach((button) => {
      button.click();
    });
    expect(input.innerText).to.equal('789,456,123');
  });

  it('Should reject decimal point as first user input.', () => {
    const decimalButton = Object.values(document.getElementsByClassName('TC-is-decimal-point'))[0];
    decimalButton.click();
    expect(input.innerText).to.equal('0');
    expect(history.innerText).to.equal('');
  });

});

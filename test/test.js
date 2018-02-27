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
const decimalButton = document.querySelectorAll("[value='.']")[0];
const addButton = document.querySelectorAll("[value='add']")[0];
const subtractButton = document.querySelectorAll("[value='subtract']")[0];
const digitZeroButton = document.querySelectorAll("[value='0']")[0];
const digitDoubleZeroButton = document.querySelectorAll("[value='00']")[0];
const digitOneButton = document.querySelectorAll("[value='1']")[0];
const digitTwoButton = document.querySelectorAll("[value='2']")[0];
const digitThreeButton = document.querySelectorAll("[value='3']")[0];

describe('Edge Cases', () => {
  beforeEach(() => {
    view.clearAll();
  });

  it('Should display 0 as default on load.', () => {
    expect(input.innerText).to.equal('0');
  });

  it('Should remove leading 0 on user input.', () => {
    digitOneButton.click();
    expect(input.innerText).to.equal('1');
  });

  it('Should correctly evaluate 0 and 00 as a number on user input.', () => {
    digitOneButton.click();
    digitZeroButton.click();
    digitDoubleZeroButton.click();
    expect(input.innerText).to.equal('1000');
  });

  it('Should reject adding a leading operator to history.', () => {
    addButton.click();
    expect(history.innerText).to.equal('');
  });

  it('Should remove previous operator, if another pressed right after.', () => {
    history.innerText = '1';
    subtractButton.click();
    addButton.click();
    expect(history.innerText).to.equal('1+');
  });

  it('Should only add digits and decimals to input.', () => {
    digitOneButton.click();
    addButton.click();
    expect(input.innerText).to.equal('1');

    decimalButton.click();
    expect(input.innerText).to.equal('1.');
  });

  it('Should reject decimal point as first user input.', () => {
    decimalButton.click();
    expect(input.innerText).to.equal('0');
    expect(history.innerText).to.equal('');
  });

  it('Should reject adding more than one decimal point.', () => {
    digitOneButton.click();
    decimalButton.click();
    digitTwoButton.click();
    digitThreeButton.click();
    decimalButton.click();
    expect(input.innerText).to.equal('1.23');

    view.clearAll();
    digitOneButton.click();
    decimalButton.click();
    decimalButton.click();
    expect(input.innerText).to.equal('1.');
  });
});

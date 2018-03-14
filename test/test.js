// import { handlers } from "../src/js/script";

/* global
describe
beforeEach
view
it
expect
:true */
/* eslint no-undef: "error" */

const display = document.getElementById('calculator__display');
const zero = document.querySelectorAll("[node-content='0']")[0];
const one = document.querySelectorAll("[node-content='1']")[0];
const two = document.querySelectorAll("[node-content='2']")[0];
const decimal = document.querySelectorAll("[node-content='.']")[0];
const ac = document.querySelectorAll("[node-content='AC']")[0];
const plus = document.querySelectorAll("[node-content='+']")[0];
const equal = document.querySelectorAll("[node-content='=']")[0];

describe('Display Cases', () => {
  beforeEach(() => {
    handlers.clearAll();
  });

  it('Should load with a 0.', () => {
    expect(display.textContent).to.equal('0');
  });

  it('Should remove default 0 on a digit press.', () => {
    one.click();
    expect(display.textContent).to.equal('1');
  });

  it('Should default to 0 on AC press.', () => {
    one.click();
    ac.click();
    expect(display.textContent).to.equal('0');
  });

  it('Should keep default 0 if a decimal is the first input', () => {
    decimal.click();
    expect(display.textContent).to.equal('0.');
  });

  it('Should reject multiple leading 0.', () => {
    zero.click();
    zero.click();
    zero.click();
    expect(display.textContent).to.equal('0');
  });

  it('Should only display new input, once an operator and new digit has been pressed.', () => {
    one.click();
    plus.click();
    two.click();
    expect(display.textContent).to.equal('2');
  });

  it('Should display numbers bigger than 9.99M in scientific notation.', () => {
    for (let i = 0; i < 10; i++) {
      one.click();
    }
    expect(display.textContent).to.equal('1.111e9');
  });

  it('Should add comma formating.', () => {
    for (let i = 0; i < 4; i++) {
      one.click();
    }
    expect(display.textContent).to.equal('1,111');
  });
  it('Should correctly reformat display with commas.', () => {
    for (let i = 0; i < 5; i++) {
      one.click();
    }
    expect(display.textContent).to.equal('11,111');
  });
});

describe('Valid Input', () => {
  beforeEach(() => {
    handlers.clearAll();
  });

  it('Should reject multiple decimal points.', () => {
    one.click();
    decimal.click();
    decimal.click();
    expect(display.textContent).to.equal('1.');
  });
});

describe('Caclulations', () => {
  beforeEach(() => {
    handlers.clearAll();
  });

  it('Should add correctly', () => {
    one.click();
    plus.click();
    one.click();
    equal.click();
    expect(display.textContent).to.equal('2');
  });
  it('Should calculate correctly, even with commas.', () => {
    for (let i = 0; i < 4; i++) {
      one.click();
    }
    plus.click();
    one.click();
    equal.click();
    expect(display.textContent).to.equal('1,112');
  });
});


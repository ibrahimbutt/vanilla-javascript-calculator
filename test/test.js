var assert = require('chai').assert;
var expect = require('chai').expect;

var calc = require('../dist/script');

describe('Operators', function () {

  beforeEach(function() {
    calc.input = '2';
    calc.total = '10';
  });

  it('Should add user input to a running total correctly', function () {
    calc.add();
    expect(calc.total).to.equal(12);
  });

  it('Should subtract user input to a running total correctly', function () {
    calc.subtract();
    expect(calc.total).to.equal(8);
  });
  
  it('Should divide user input to a running total correctly', function () {
    calc.divide();
    expect(calc.total).to.equal(5);
  })

  it('Should multiply user input to a running total correctly', function () {
    calc.multiply()
    expect(calc.total).to.equal(20);
  })

  it('Should output total correctly', function () {
    expect(calc.total).to.equal('10');
  })
});

describe('Register Inputs', function () {

  before(function() {
    calc.input = '';
    calc.history = ''
  });

  it('Should add user input to `calculator.input`.', function () {
    calc.addToInput('2')
    expect(calc.input).to.equal('2');
  })
  it('Should add user input to `calculator.history`.', function () {
    calc.addToHistory('2')
    expect(calc.history).to.equal('2');
  })
});



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
});

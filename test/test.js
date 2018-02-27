describe('Edge Cases', () => {
  const total = document.getElementById('input');

  it('Should display 0 as input on load.', () => {
    expect(total.innerText).to.equal("0");
  });
});

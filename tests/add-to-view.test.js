const addToView = require('../addToView');

test('adds 1 + 2 to equal 3', () => {
  expect(addToView(1, 2)).toBe(3);
});
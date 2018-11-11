const testData = require('./testData.js');

const find = require('../find.js');

const findCases = [
  {
    value: 'BA',
    result: ['BA', 'BAD'],
  },
  {
    value: 'CA',
    result: ['CAB', 'CAD', 'CAD'],
  },
];

findCases.forEach(({ value, result }) => {
  test('for find', () => {
    expect(find(testData.tree, testData.wordList, value)).toEqual(result);
  });
});

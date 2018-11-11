const testData = require('./testData.js');

const getNodeIds = require('../getNodeIds.js');

const getNodeCases = [
  {
    value: testData.tree.A,
    result: ['id123456785', 'id123456787'],
  },
  {
    value: testData.tree.D,
    result: ['id123456784'],
  },
];

getNodeCases.forEach(({ value, result }) => {
  test('for getNodeIds', () => {
    expect(getNodeIds(value)).toEqual(result);
  });
});

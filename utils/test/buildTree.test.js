const testData = require('./testData.js');

const buildTree = require('../buildTree.js');

test('for buildTree', () => {
  expect(buildTree(testData.wordList)).toEqual(testData.tree);
});

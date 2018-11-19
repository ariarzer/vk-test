const tree = require('../testData/tree.json');
const tree2 = require('../testData/tree2');
const users = require('../testData/users');

const Users = require('../../users');
const FindTree = require('../../find-tree.js');

const names = new Users(users).get('personalName');
const surnames = new Users(users).get('familyName');

test('for build tree', () => {
  expect(new FindTree(names).tree).toEqual(tree);
});

test('for build custom tree', () => {
  expect(new FindTree(surnames, new FindTree(names).tree).tree).toEqual(tree2);
});

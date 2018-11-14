const tree = require('../testData/tree.json');
const tree2 = require('../testData/tree2');
const users = require('../testData/users');

const Users = require('../../Users');
const PrefixTree = require('../../PrefixTree.js');

const names = new Users(users).get('personalName');
const surnames = new Users(users).get('familyName');

test('for build tree', () => {
  expect(new PrefixTree(names).tree).toEqual(tree);
});

test('for build custom tree', () => {
  expect(new PrefixTree(surnames, new PrefixTree(names).tree).tree).toEqual(tree2);
});

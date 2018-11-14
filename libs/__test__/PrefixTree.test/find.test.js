const users = require('../testData/users');
const findM = require('../testData/find_M');
const findOlivia = require('../testData/find_Olivia');

const Users = require('../../Users');
const PrefixTree = require('../../PrefixTree.js');

const names = new Users(users).get('personalName');
const surnames = new Users(users).get('familyName');

const tree = new PrefixTree(surnames, new PrefixTree(names).tree);

test('for find M', () => {
  expect(tree.find('M', users)).toEqual(findM);
});

test('for find Olivia', () => {
  expect(tree.find('Olivia', users)).toEqual(findOlivia);
});

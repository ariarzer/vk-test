const users = require('../testData/users');

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

test('for find Olivia Madlen', () => {
  expect(tree.find('Olivia Madlen', users)).toEqual(findOliviaMadlen);
});

test('for find Я', () => {
  expect(tree.find('Я', users)).toEqual(findYa);
});

test('for find Щ', () => {
  expect(tree.find('Щ', users)).toEqual(findSch);
});

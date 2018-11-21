const users = require('../testData/users');
const findM = require('../testData/find_M');
const findOlivia = require('../testData/find_Olivia');
const findOliviaMadlen = require('../testData/find_Olivia_Madlen');
const findYa = require('../testData/find_Я');
const findSch = require('../testData/find_Щ');

const Users = require('../../users');
const FindTree = require('../../find-tree.js');

const names = new Users(users).get('personalName');
const surnames = new Users(users).get('familyName');

const tree = new FindTree(surnames, new FindTree(names).tree);

test('for findPhrase M', () => {
  expect(tree.findPhrase('M', users)).toEqual(findM);
});

test('for findPhrase Olivia', () => {
  expect(tree.findPhrase('Olivia', users)).toEqual(findOlivia);
});

test('for findPhrase Olivia Madlen', () => {
  expect(tree.findPhrase('Olivia Madlen', users)).toEqual(findOliviaMadlen);
});

test('for findPhrase Я', () => {
  expect(tree.findPhrase('Я', users)).toEqual(findYa);
});

test('for findPhrase Щ', () => {
  expect(tree.findPhrase('Щ', users)).toEqual(findSch);
});

test('for findPhrase кщпщ', () => {
  expect(tree.findPhrase('кщпщ', users)).toEqual([]);
});

const users = require('../testData/users');

const Users = require('../../Users');
const PrefixTree = require('../../PrefixTree.js');

const names = new Users(users).get('personalName');
const surnames = new Users(users).get('familyName');

const tree = new PrefixTree(surnames, new PrefixTree(names).tree);

const findRogozov = require('../testData/find_rogozov');

const rogozov = ['рого', 'hjuj', 'rogo', 'кщпщ'];

rogozov.forEach((item) => {
  test(`for find Рогозов ${item}`, () => {
    expect(tree.find(item, users)).toEqual(findRogozov);
  });
});

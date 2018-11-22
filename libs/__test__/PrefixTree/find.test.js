const users = require('../testData/users');

const Users = require('../../users');
const FindTree = require('../../find-tree.js');

const names = new Users(users).getByField('personalName');
const surnames = new Users(users).getByField('familyName');

const tree = new FindTree(surnames, new FindTree(names).tree);

const findRogozov = require('../testData/find_rogozov');

const rogozov = ['рого', 'hjuj', 'rogo', 'кщпщ', 'андрей р'];

rogozov.forEach((item) => {
  test(`for find Рогозов ${item}`, () => {
    expect(tree.find(item, users)).toEqual(findRogozov);
  });
});

const Tree = require('../../PrefixTree.js');

const users = require('./users');

const names = {};
Object.keys(users).forEach((key) => {
  names[key] = users[key].personalName;
});

const surnames = {};
Object.keys(users).forEach((key) => {
  surnames[key] = users[key].familyName;
});

const tree2 = new Tree(names);

const tree = new Tree(surnames, tree2.tree);

const find = tree.find('Olivia', users);

console.log(JSON.stringify(find));

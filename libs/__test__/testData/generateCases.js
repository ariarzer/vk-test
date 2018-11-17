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

const tree = new Tree(names);

// const tree2 = new Tree(surnames, tree.tree);

// const find = tree.find('Olivia', users);

console.log(JSON.stringify(tree));

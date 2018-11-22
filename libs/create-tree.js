const FindTree = require('./find-tree');

function createTree(users) {
  return new FindTree(users.getByField('personalName'), new FindTree(users.getByField('familyName')).tree);
}

module.exports = createTree;

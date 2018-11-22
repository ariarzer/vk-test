const FindTree = require('./find-tree');

function createTree(users) {
  return new FindTree(users.get('personalName'), new FindTree(users.get('familyName')).tree);
}

module.exports(createTree);

const FindTree = require('../../../libs/find-tree');
const User = require('../../../libs/users');

export default function update(usersCase, store, dispatch) {
  dispatch({ type: 'UPDATE_USERS', value: Object.assign({}, usersCase, store.users) });
  const users = new User(usersCase);
  const tree = new FindTree(users.get('personalName'), store.tree.tree);
  const tree2 = new FindTree(users.get('familyName'), tree.tree);
  dispatch({ type: 'UPDATE_TREE', value: tree2 });
}

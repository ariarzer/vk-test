const FindTree = require('../../../libs/find-tree');
const User = require('../../../libs/users');

export default function update(usersCase, store, dispatch) {
  return new Promise((resolve) => {
    dispatch({ type: 'UPDATE_USERS', value: Object.assign({}, usersCase, store.users) });
    const users = new User(usersCase);
    const treeNames = new FindTree(users.get('personalName'), store.tree.tree);
    const treeSurnames = new FindTree(users.get('familyName'), treeNames.tree);
    dispatch({
      type: 'UPDATE',
      tree: treeSurnames,
      users: Object.assign({}, usersCase, store.users),
    });
    resolve();
  });
}

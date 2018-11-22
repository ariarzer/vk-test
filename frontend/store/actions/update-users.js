const createTree = require('../../../libs/create-tree');
const User = require('../../../libs/users');

export default function update(usersCase, store, dispatch) {
  return new Promise((resolve) => {
    const tree = createTree(new User(Object.assign(store.users, usersCase)));
    dispatch({
      type: 'UPDATE_USERS',
      tree,
      users: Object.assign({}, usersCase, store.users),
    });
    resolve(usersCase);
  });
}

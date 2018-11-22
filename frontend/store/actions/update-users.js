const createTree = require('../../../libs/create-tree');
const User = require('../../../libs/users');

export default function update(usersCase, store, dispatch) {
  return new Promise((resolve) => {
    const tree = createTree(new User(Object.assign(store.users.items, usersCase)));
    dispatch({
      type: 'UPDATE_USERS',
      tree,
      users: {
        meta: store.users.meta,
        items: Object.assign({}, usersCase, store.users.items),
      },
    });
    resolve(usersCase);
  });
}

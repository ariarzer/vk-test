const createTree = require('../../../libs/create-tree');
const User = require('../../../libs/users');

export default function init(count, dispatch) {
  return fetch(`/api/v0/users?start=${0}&count=${count}`, { cache: 'no-cache' })
    .then(result => result.json())
    .then((result) => {
      const tree = createTree(new User(result));
      dispatch({
        type: 'INIT',
        tree,
        users: result,
        conversation: Object.keys(result),
      });
    });
}

import api from '../../libs/api';

const createTree = require('../../../libs/create-tree');
const User = require('../../../libs/users');

export default function init(count, dispatch) {
  return api('users', { start: 0, count })
    .then((result) => {
      const tree = createTree(new User(result.items));
      dispatch({
        type: 'INIT',
        tree,
        users: result,
        conversation: Object.keys(result.items),
      });
    });
}

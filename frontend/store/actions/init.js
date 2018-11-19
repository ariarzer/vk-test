const FindTree = require('../../../libs/find-tree');
const User = require('../../../libs/users');

export default function init(count, dispatch) {
  fetch(`/api/v0/users?start=${0}&count=${count}`, { cache: 'no-cache' })
    .then(result => result.text())
    .then((result) => {
      dispatch({ type: 'INIT_USERS', value: JSON.parse(result) });
      return JSON.parse(result);
    }).then((result) => {
      const users = new User(result);
      const tree = new FindTree(users.get('personalName'), new FindTree(users.get('familyName')).tree);
      dispatch({ type: 'INIT_FIND_TREE', value: tree });
    });

}

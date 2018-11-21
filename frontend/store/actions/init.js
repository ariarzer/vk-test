const FindTree = require('../../../libs/find-tree');
const User = require('../../../libs/users');

export default function init(count, dispatch) {
  return new Promise((resolve, reject) => {
    fetch(`/api/v0/users?start=${0}&count=${count}`, { cache: 'no-cache' })
      .then(result => result.json())
      .then((result) => {
        const users = new User(result);
        const tree = new FindTree(users.get('personalName'), new FindTree(users.get('familyName')).tree);
        dispatch({
          type: 'INIT',
          tree,
          users: result,
          conversation: Object.keys(result),
        });
        resolve();
      })
      .catch(error => reject(error));
  });
}

const initialState = {};

const reducer = function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INIT':
      console.log(action);
      return Object.assign({}, state, {
        users: action.users,
        conversation: action.conversation,
        tree: action.tree,
      });

    case 'UPDATE':
      return Object.assign({}, state, {
        users: action.users,
        tree: action.tree,
      });
    default:
      return state;
  }
};

export default reducer;

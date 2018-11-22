const initialState = {
  users: {
    items: {},
  },
};

const reducer = function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INIT':
      return Object.assign({}, state, {
        users: action.users,
        conversation: action.conversation,
        convTree: action.tree,
      });

    case 'UPDATE_USERS':
      return Object.assign({}, state, {
        users: action.users,
      });

    default:
      return state;
  }
};

export default reducer;

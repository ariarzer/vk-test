const initialState = {};

const reducer = function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INIT_USERS':
      return Object.assign({}, state, { users: action.value });
    case 'INIT_FIND_TREE':
      return Object.assign({}, state, { tree: action.value });
    default:
      return state;
  }
};

export default reducer;

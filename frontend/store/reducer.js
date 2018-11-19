const initialState = {
  searchResult: {},
  select: {},
};

const reducer = function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_SEARCH_RESULT':
      return Object.assign({}, state, { searchResult: action.result });
    case 'CLEAR_SEARCH_RESULT':
      return Object.assign({}, state, { searchResult: {} });
    case 'ADD_SELECT':
      return Object.assign({}, state, { select: Object.assign(state.select, action.value) });
    case 'UPDATE_SELECT':
      return Object.assign({}, state, { select: action.value });
    case 'REMOVE_SELECT_ITEM':
      return Object.assign({}, state, { select: action.value });
    default:
      return state;
  }
};

export default reducer;

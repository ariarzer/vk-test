function selectUser(value, multiple, dispatch) {
  if (multiple) {
    dispatch({ type: 'ADD_SELECT', value });
  } else {
    dispatch({ type: 'UPDATE_SELECT', value });
  }
}

export default selectUser;

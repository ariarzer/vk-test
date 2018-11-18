function search(value, dispatch) {
  if (value) {
    fetch(`/search?value=${value}`, { cache: 'no-cache' })
      .then(result => result.text())
      .then(result => dispatch({ type: 'ADD_SEARCH_RESULT', result: JSON.parse(result) }));
  } else {
    dispatch({ type: 'CLEAR_SEARCH_RESULT' });
  }
}

export default search;

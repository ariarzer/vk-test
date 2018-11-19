function removeSelectItem(id, select, dispatch) {
  const sel = select;
  delete sel[id];
  dispatch({ type: 'REMOVE_SELECT_ITEM', value: sel });
}

export default removeSelectItem;

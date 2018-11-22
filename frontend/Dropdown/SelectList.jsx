import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import style from './select-list.css';

function SelectList(props) {
  const {
    multiple, onClickAdd, onClickRemove, selectList, store: { users },
  } = props;

  return (selectList.length !== 0
    ? (
      <div className="dropdown__select-list select-list">
        {(selectList).map(key => (
          <div key={key} className="select-list__item">
            {users[key].personalName}
            {' '}
            {users[key].familyName}
            <button type="button" onClick={onClickRemove} id={key} className="select-list__remove-button" />
          </div>
        ))}
        {multiple
          ? (
            <button type="button" onClick={onClickAdd} className="select-list__add-button">
              Add
              <span className="select-list__button-icon" />
            </button>
          )
          : null}
      </div>
    )
    : (null)
  );
}

SelectList.propTypes = {
  multiple: PropTypes.bool.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  selectList: PropTypes.objectOf(PropTypes.object).isRequired,
  store: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(store => ({ store }))(SelectList);

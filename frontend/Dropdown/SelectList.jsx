import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function SelectList(props) {
  const {
    multiple, onClickAdd, onClickRemove, selectList, store: { users },
  } = props;

  return (selectList.length !== 0
    ? (
      <div>
        <ul>
          {(selectList).map(key => (
            <li key={key}>
              {users[key].personalName}
              {users[key].familyName}
              <button type="button" onClick={onClickRemove} id={key}>-</button>
            </li>
          ))}
        </ul>
        {multiple
          ? (<button type="button" onClick={onClickAdd}>Add+</button>)
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function SelectList(props) {
  const {
    multiple, onClickAdd, onClickRemove, selectList,
  } = props;

  return (Object.keys(selectList).length !== 0
    ? (
      <div>
        <ul>
          {Object.keys(selectList).map(key => (
            <li key={key}>
              {selectList[key].personalName}
              {selectList[key].familyName}
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
};

export default connect(store => ({ store }))(SelectList);

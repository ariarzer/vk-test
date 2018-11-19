import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Select(props) {
  const {
    multiple, store: { select }, onClickAdd, onClickRemove,
  } = props;

  return (Object.keys(select).length
    ? (
      <div>
        <ul>
          {Object.keys(select).map(key => (
            <li key={key}>
              {select[key].personalName}
              {select[key].familyName}
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

Select.propTypes = {
  store: PropTypes.objectOf(PropTypes.object).isRequired,
  multiple: PropTypes.bool.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

export default connect(store => ({ store }))(Select);

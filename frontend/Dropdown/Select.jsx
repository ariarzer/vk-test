import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Select(props) {
  const { multiple, store: { select }, onClick } = props;

  return (Object.keys(select).length
    ? (
      <div>
        <ul>
          {Object.keys(select).map(key => (
            <li id={key} key={key}>
              {select[key].personalName}
              {select[key].familyName}
            </li>
          ))}
        </ul>
        {multiple
          ? (<button type="button" onClick={onClick}>Add+</button>)
          : null}
      </div>
    )
    : (null)
  );
}

Select.propTypes = {
  store: PropTypes.objectOf(PropTypes.object).isRequired,
  multiple: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default connect(store => ({ store }))(Select);

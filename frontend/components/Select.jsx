import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { onAddClick } = this.props;
    onAddClick();
  }

  render() {
    const { selected } = this.props;

    return selected
      ? (
        <div>
          <div>
            {selected.personalName}
            {' '}
            {selected.familyName}
          </div>
          <button type="button" onClick={this.onClick}>Add+</button>
        </div>
      )
      : (null);
  }
}

Select.propTypes = {
  selected: PropTypes.objectOf(PropTypes.object).isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default Select;

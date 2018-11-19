import React from 'react';
import PropTypes from 'prop-types';
import { createIcon } from '@download/blockies';
import { connect } from 'react-redux';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.onError = this.onError.bind(this);
  }

  onError(e) {
    const parent = e.target.parentNode;
    parent.removeChild(e.target);

    const icon = createIcon({
      seed: parent.innerHTML,
      size: 50 / 5,
      scale: 5,
    });
    parent.appendChild(icon);
  }

  render() {
    const { showAvatar: show, onClick, list } = this.props;

    return (
      <div>
        <ul onClick={onClick}>
          {Object.keys(list).map(key => (
            <li
              id={key}
              key={key}
            >
              {list[key].personalName}
              {list[key].familyName}
              {show
                ? (
                  <img
                    src={list[key].avatar}
                    alt={`avatar ${list[key].personalName} ${list[key].familyName}`}
                    onError={this.onError}
                  />)
                : null
              }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  showAvatar: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  list: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(store => ({ store }))(List);

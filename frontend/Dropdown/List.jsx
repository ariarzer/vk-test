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
    const { showAvatar: show, store, onClick } = this.props;
    const { searchResult: res } = store;

    return (
      <div>
        <ul onClick={onClick}>
          {Object.keys(res).map(key => (
            <li
              id={key}
              key={key}
            >
              {res[key].personalName}
              {res[key].familyName}
              {show
                ? (
                  <img
                    src={res[key].avatar}
                    alt={`avatar ${res[key].personalName} ${res[key].familyName}`}
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
  store: PropTypes.objectOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default connect(store => ({ store }))(List);

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
    const {
      showAvatar: show, onClick, list,
    } = this.props;

    return (Object.keys(list).length
      ? (
        <div className="dropdown__search-list">
          <ul>
            {Object.keys(list).map(key => (
              <li
                id={key}
                key={key}
                className="search-item"
                onClick={onClick.bind(null, key)}
              >
                {show
                  ? (
                    <div className="search-item__avatar">
                      <img
                        src={list[key].avatar}
                        alt={`avatar ${list[key].personalName} ${list[key].familyName}`}
                        onError={this.onError}
                      />
                    </div>)
                  : null
                }
                <div className="search-item__content">
                  <div className="search-item__name">
                    {list[key].personalName}
                    {' '}
                    {list[key].familyName}
                  </div>
                  <div className="search-item__meta">
                    {list[key].meta}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
      : null
    );
  }
}

List.propTypes = {
  showAvatar: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  list: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(store => ({ store }))(List);

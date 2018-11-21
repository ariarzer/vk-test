import React from 'react';
import PropTypes from 'prop-types';
import {createIcon} from '@download/blockies';

class UsersListItem extends React.Component {
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
      showAvatar, item,
    } = this.props;

    return (
      <React.Fragment>
        {showAvatar
          ? (
            <div className="search-item__avatar">
              <img
                src={item.avatar}
                alt={`avatar ${item.personalName} ${item.familyName}`}
                onError={this.onError}
              />
            </div>)
          : null
        }
        <div className="search-item__content">
          <div className="search-item__name">
            {item.personalName}
            {' '}
            {item.familyName}
          </div>
          <div className="search-item__meta">
            {item.meta}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

UsersListItem.propTypes = {
  showAvatar: PropTypes.bool.isRequired,
  item: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default UsersListItem;

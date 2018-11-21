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
      showAvatar: show, onClick, list: search, store: { users, conversation },
    } = this.props;

    const list = conversation
      ? (search.length ? search : conversation)
      : [];

    return (list.length
      ? (
        <div className="dropdown__search-list">
          <ul>
            {list.map(key => (
              <li
                id={key}
                key={key}
                className="search-item"
                onClick={users[key] ? onClick.bind(null, key) : null}
              >
                {show
                  ? (
                    <div className="search-item__avatar">
                      <img
                        src={users[key].avatar}
                        alt={`avatar ${users[key].personalName} ${users[key].familyName}`}
                        onError={this.onError}
                      />
                    </div>)
                  : null
                }
                {users[key]
                  ? (
                    <div className="search-item__content">
                      <div className="search-item__name">
                        {users[key].personalName}
                        {' '}
                        {users[key].familyName}
                      </div>
                      <div className="search-item__meta">
                        {users[key].meta}
                      </div>
                    </div>
                  )
                  : (<div>Loading...</div>)
                }
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
  store: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(store => ({ store }))(List);

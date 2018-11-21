import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UsersListItem from './UsersListItem.jsx';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      showAvatar, onClick, list: search, store: { users, conversation },
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
                <UsersListItem showAvatar={showAvatar} item={users[key]} />
              </li>
            ))}
          </ul>
        </div>
      )
      : null
    );
  }
}

UsersList.propTypes = {
  showAvatar: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  list: PropTypes.objectOf(PropTypes.object).isRequired,
  store: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(store => ({ store }))(UsersList);

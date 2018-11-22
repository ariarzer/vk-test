import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UsersListItem from './UsersListItem.jsx';

import './search-list.css';

function UsersList(props) {
  const {
    list, showAvatar, onClick, store: { users }, loading,
  } = props;

  return (
    <div className="dropdown__search-list">
      {!loading && !list.length ? (
        <p>Ничего не найдено :(</p>
      ) : (
        <ul>
          {list.map(id => (
            <li
              key={id}
              className="search-item"
              onClick={onClick.bind(null, id)}
            >
              <UsersListItem showAvatar={showAvatar} item={users[id]} />
            </li>
          ))}
        </ul>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
}

UsersList.propTypes = {
  showAvatar: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  store: PropTypes.objectOf(PropTypes.object).isRequired,
  list: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(store => ({ store }))(UsersList);

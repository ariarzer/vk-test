import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, InfiniteLoader } from 'react-virtualized';

import UsersListItem from './UsersListItem.jsx';

import './search-list.css';

function UsersList(props) {
  const {
    list,
    showAvatar,
    onClick,
    loading,
    loadMore,
    totalCount,
    store: { users },
  } = props;

  return (
    <div className="dropdown__search-list">
      {!loading && !list.length ? (
        <p>Ничего не найдено :(</p>
      ) : (
        <InfiniteLoader
          isRowLoaded={({ index }) => !!(users.items[list[index]])}
          loadMoreRows={loadMore}
          rowCount={totalCount}
        >
          {({ onRowsRendered, registerChild }) => (
            <List
              width={380}
              height={220}
              rowCount={list.length}
              rowHeight={50}
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              rowRenderer={({ key, index, style }) => (
                <div
                  key={key}
                  style={style}
                  className="search-item"
                  onClick={onClick.bind(null, list[index])}
                >
                  <UsersListItem
                    showAvatar={showAvatar}
                    item={users.items[list[index]]}
                  />
                </div>
              )}
            />
          )}
        </InfiniteLoader>
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
  loadMore: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default connect(store => ({ store }))(UsersList);

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import UsersList from './UsersList.jsx';
import SelectList from './SelectList.jsx';

import './dropdown.css';

import init from '../store/actions/init';
import update from '../store/actions/update-users';
import debouncePromise from '../libs/debounce-promise';
import api from '../libs/api';

const search = debouncePromise(value => api('search', { value }));

const loadUserByIds = debouncePromise(ids => api('users', { ids: JSON.stringify(ids) }));

const loadUserByIndex = debouncePromise((start, count) => api('users', { start, count }));

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,

      inputValue: '',
      searchResult: [],
      selectList: [],
      lastLoad: 100,
    };

    this.textInput = React.createRef();
  }

  componentDidMount() {
    const { dispatch } = this.props;

    init(100, dispatch)
      .then(() => this.setState({ loading: false, error: null }))
      .catch((error) => {
        this.setState({ loading: false, error });
      });
  }

  onChange = ({ target: { value } }) => {
    this.setState({
      inputValue: value,

      ...(!value ? {
        lastLoad: 100,
        searchResult: [],
      } : {
        loading: true,
      }),
    }, () => {
      if (value) {
        this.loadSearchResult(value);
      }
    });
  };

  onSelected = (id) => {
    const { multiple } = this.props;
    const { selectList } = this.state;

    this.setState((prevState) => {
      if (multiple) {
        return Object.assign(
          {},
          prevState,
          { selectList: (selectList.includes(id) ? selectList : [...selectList, id]) },
        );
      }
      return Object.assign(
        {},
        prevState,
        { selectList: (selectList[0] !== id ? [id] : selectList) },
      );
    });
  };

  onClickAdd = () => {
    this.setState({ inputValue: '' });
    this.textInput.current.focus();
  };

  onClickRemove = ({ target: { id } }) => {
    const { selectList } = this.state;

    this.setState({
      selectList: [
        ...selectList.slice(0, selectList.indexOf(id)),
        ...selectList.slice(selectList.indexOf(id) + 1, selectList.length),
      ],
    });
  };

  loadSearchResult = () => {
    const { store, dispatch, store: { convTree, conversation } } = this.props;
    const { inputValue } = this.state;

    let searchResult = convTree.find(inputValue, conversation);

    this.setState({ searchResult, lastLoad: searchResult.length });

    search(inputValue)
      .then((result) => {
        searchResult = convTree.unique([
          ...searchResult,
          ...result,
        ]);

        const diffList = searchResult
          .reduce((uniq, userId) => {
            if (!store.users.items[userId]) {
              uniq.push(userId);
            }

            return uniq;
          }, []);

        if (!diffList.length) {
          return Promise.resolve();
        }

        return loadUserByIds(diffList.slice(0, 100))
          .then(res => update(res.items, store, dispatch));
      })
      .then(() => {
        this.setState({
          searchResult,
          error: null,
          loading: false,
          lastLoad: Math.min(100, searchResult.length),
        });
      })
      .catch((error) => {
        if (error === 'debounce') {
          return;
        }

        this.setState({ loading: false, error });
      });
  };

  prepareList = () => {
    const { inputValue, searchResult, lastLoad } = this.state;
    const { store: { conversation, users } } = this.props;

    if (!inputValue) {
      return conversation ? {
        list: Object.keys(users.items).sort().slice(0, lastLoad),
        totalCount: users.meta.totalCount,
      } : {
        list: [],
        totalCount: 0,
      };
    }

    return searchResult.length ? {
      list: searchResult.slice(0, lastLoad),
      totalCount: searchResult.length,
    } : {
      list: [],
      totalCount: 0,
    };
  };

  loadMore = ({ startIndex, stopIndex }) => {
    const { inputValue, searchResult, lastLoad } = this.state;
    const { store, dispatch } = this.props;

    this.setState({ loading: true, error: null });

    let pr;
    let count;
    if (inputValue) {
      const ids = searchResult.slice(startIndex, stopIndex);

      count = ids.length;
      pr = loadUserByIds(ids);
    } else {
      count = stopIndex - startIndex;
      pr = loadUserByIndex(startIndex, count);
    }

    return pr
      .then(result => update(result.items, store, dispatch))
      .then(() => {
        this.setState({
          lastLoad: lastLoad + count,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        if (error === 'debounce') {
          return Promise.resolve();
        }

        throw error;
      });
  };

  render() {
    const {
      inputValue, selectList, loading, error,
    } = this.state;
    const { multiple, showAvatar } = this.props;

    const { list, totalCount } = this.prepareList();

    return (
      <div className="dropdown">
        <div className="dropdown__input-box">
          <SelectList
            multiple={multiple}
            onClickAdd={this.onClickAdd}
            onClickRemove={this.onClickRemove}
            selectList={selectList}
            className="dropdown__select-list"
          />
          <input
            autoComplete="off"
            onChange={this.onChange}
            value={inputValue}
            ref={this.textInput}
            className="dropdown__input"
          />
        </div>

        {error ? (
          <p>Loading error. Try to reload page</p>
        ) : (
          <UsersList
            list={list}
            loadMore={this.loadMore}
            loading={loading}
            showAvatar={showAvatar}
            totalCount={totalCount}
            onClick={this.onSelected}
          />
        )}
      </div>
    );
  }
}

Dropdown.propTypes = {
  multiple: PropTypes.bool,
  showAvatar: PropTypes.bool,
  store: PropTypes.objectOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  multiple: true,
  showAvatar: true,
};

export default connect(store => ({ store }))(Dropdown);

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import UsersList from './UsersList.jsx';
import SelectList from './SelectList.jsx';

import './dropdown.css';

import init from '../store/actions/init';
import update from '../store/actions/update-users';
import debouncePromise from '../../libs/debounce-promise';

const search = debouncePromise((value) => {
  return fetch(`/api/v0/search?value=${value}`, { cache: 'no-cache' });
}, 300);

const loadUser = debouncePromise((ids) => {
  return fetch(`/api/v0/users?ids=${JSON.stringify(ids)}`, { cache: 'no-cache' });
}, 300);

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,

      inputValue: '',
      searchResult: [],
      selectList: [],
      lastLoad: 0,
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
    this.setState({ inputValue: value }, () => {
      if (!value) {
        this.setState({ searchResult: [] });

        return;
      }

      this.loadSearchResult(value);
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
    const { store, dispatch } = this.props;
    const { inputValue } = this.state;
    this.setState({ loading: true });
    let searchResult;

    search(inputValue)
      .then((result) => {
        if (!result.ok) {
          throw result.error;
        }

        return result.json();
      })
      .then((result) => {
        searchResult = result;

        const diffList = result
          .reduce((uniq, userId) => {
            if (!store.users[userId]) {
              uniq.push(userId);
            }

            return uniq;
          }, []);

        if (!diffList.length) {
          return Promise.resolve();
        }

        return loadUser(diffList.slice(0, 100))
          .then((result) => {
            if (!result.ok) {
              throw result.error;
            }
            return result.json();
          })
          .then(result => update(result, store, dispatch));
      })
      .then(() => {
        this.setState({
          lastLoad: 100, loading: false, error: null, searchResult,
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
    const { store: { conversation, convTree } } = this.props;

    const search = searchResult.length ? searchResult.slice(0, lastLoad) : [];

    // Empty saarch
    if (!inputValue) {
      return conversation || [];
    }

    if (convTree) {
      return search.length
        ? convTree.unique([
          ...convTree.find(inputValue, conversation),
          ...search,
        ])
        : convTree.find(inputValue, conversation);
    }

    return [];
  };

  render() {
    const { inputValue, selectList, loading, error } = this.state;
    const { multiple, showAvatar } = this.props;

    const list = this.prepareList();

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
            loading={loading}
            showAvatar={showAvatar}
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

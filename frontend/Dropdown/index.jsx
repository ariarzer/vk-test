import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import UsersList from './UsersList.jsx';
import SelectList from './SelectList.jsx';

import init from '../store/actions/init';
import update from '../store/actions/update-users';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      searchResult: [],
      selectList: [],
      lastLoad: 0,
      loading: true,
    };

    this.onChange = this.onChange.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
    this.loadSearchResult = this.loadSearchResult.bind(this);

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

  onChange({ target: { value } }) {
    this.setState({ inputValue: value }, () => {
      if (!value) {
        this.setState({ searchResult: [] });

        return;
      }
      this.loadSearchResult(value);
    });
  }

  onSelected(id) {
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
  }

  onClickAdd() {
    this.setState({ inputValue: '' });
    this.textInput.current.focus();
  }

  onClickRemove({ target: { id } }) {
    const { selectList } = this.state;

    this.setState({
      selectList: [
        ...selectList.slice(0, selectList.indexOf(id)),
        ...selectList.slice(selectList.indexOf(id) + 1, selectList.length),
      ],
    });
  }

  loadSearchResult() {
    const { store, dispatch } = this.props;
    const { inputValue } = this.state;
    this.setState({ loading: true });
    let searchResult;

    fetch(`/api/v0/search?value=${inputValue}`, { cache: 'no-cache' })
      .then((result) => {
        if (!result.ok) {
          throw result.error;
        }

        return result.json();
      })
      .then((result) => {
        searchResult = result;

        const diffList = result.reduce((acc, cur) => (store.users[cur] ? acc : [...acc, cur]), []);

        return fetch(`/api/v0/users?ids=${JSON.stringify(diffList.slice(0, 100))}`, { cache: 'no-cache' });
      })
      .then((result) => {
        if (!result.ok) {
          throw result.error;
        }
        return result.json();
      })
      .then(result => update(result, store, dispatch))
      .then(() => {
        this.setState({
          lastLoad: 100, loading: false, error: null, searchResult,
        });
      })
      .catch((error) => {
        this.setState({ loading: false, error });
      });
  }

  render() {
    const {
      inputValue, selectList, searchResult, lastLoad,
    } = this.state;
    const { multiple, showAvatar } = this.props;

    return (
      <div className="dropdown" ref={this.Dropdown}>
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
        <UsersList
          showAvatar={showAvatar}
          onClick={this.onSelected}
          search={searchResult.length ? searchResult.slice(0, lastLoad) : []}
          inputValue={inputValue}
        />
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

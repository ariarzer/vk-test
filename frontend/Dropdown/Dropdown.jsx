import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import List from './List.jsx';
import SelectList from './SelectList.jsx';

import init from '../store/actions/init';
import update from '../store/actions/update';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.config = props.config;

    this.state = {
      inputValue: '',
      searchResult: {},
      selectList: {},
      users: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);

    this.textInput = React.createRef();
  }

  componentDidMount() {
    const { dispatch } = this.props;

    init(100, dispatch);
  }

  onChange({ target: { value } }) {
    this.setState({ inputValue: value });
    const { store, dispatch } = this.props;

    if (value) {
      // for ids
      fetch(`/api/v0/search?value=${value}`, { cache: 'no-cache' })
        .then(result => result.text())
        .then(result => JSON.parse(result))
        .then((result) => {
          this.setState({ searchResult: result });
          // diff with store.users
          const diffList = result.reduce((acc, cur) => {
            if (Object.keys(store.users).includes(cur)) {
              return acc;
            }
            return [...acc, cur];
          }, []);
          // for users data
          fetch(`/api/v0/users?ids=${JSON.stringify(diffList.slice(0, 100))}`, { cache: 'no-cache' })
            .then(res => res.text())
            .then(res => JSON.parse(res))
            .then((res) => {
              this.setState({ users: res });
              update(res, store, dispatch);
            });
          const { searchResult } = this.state;
          this.setState({ searchResult: searchResult.slice(100, searchResult.length) });
        });
    } else {
      this.setState({ searchResult: {} });
    }
  }

  onSelected({ target: { id } }) {
    const { multiple } = this.config;
    const { selectList, searchResult } = this.state;

    this.setState({
      selectList: multiple
        ? Object.assign({}, selectList, { [id]: searchResult[id] })
        : { [id]: searchResult[id] },
    });
  }

  onClickAdd() {
    this.setState({ inputValue: '' });
    this.textInput.current.focus();
  }

  onClickRemove({ target: { id } }) {
    const { selectList } = this.state;

    this.setState({
      selectList: Object.keys(selectList)
        .filter(item => item !== id)
        .reduce((acc, cur) => {
          acc[cur] = selectList[cur];
          return acc;
        }, {}),
    });
  }

  render() {
    const { inputValue, selectList, users } = this.state;
    const { store } = this.props;
    const { multiple } = this.config;

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
        <List
          className="dropdown__search-list"
          searchResult={store.searchResult}
          showAvatar={this.config.showAvatars}
          onClick={this.onSelected}
          list={Object.assign(
            {},
            store.tree
              ? store.tree.find(inputValue, store.users)
              : {},
            users,
          )}
        />
      </div>
    );
  }
}

Dropdown.propTypes = {
  config: PropTypes.shape({
    multiple: PropTypes.bool,
  }).isRequired,
  store: PropTypes.objectOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(store => ({ store }))(Dropdown);

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import List from './List.jsx';
import Selected from './Select.jsx';

import search from '../store/actions/search';
import selectUser from '../store/actions/selectUser';
import removeSelectItem from '../store/actions/remove-select-item';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.config = props.config;

    this.state = {
      inputValue: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);

    this.textInput = React.createRef();
  }

  onChange(e) {
    const { value } = e.target;
    const { dispatch } = this.props;

    this.setState({ inputValue: value });

    search(value, dispatch);
  }

  onSelected(e) {
    const { id } = e.target;
    const { multiple } = this.config;
    const { dispatch } = this.props;
    const { store: { searchResult } } = this.props;

    selectUser({ [id]: searchResult[id] }, multiple, dispatch);
  }

  onClickAdd() {
    this.setState({ inputValue: '' });
    this.textInput.current.focus();
  }

  onClickRemove(e) {
    const { dispatch, store: { select: s } } = this.props;
    const { id } = e.target;
    removeSelectItem(id, s, dispatch);
  }

  render() {
    const { inputValue } = this.state;
    const { store } = this.props;
    const { multiple } = this.config;

    return (
      <div>
        <Selected
          multiple={multiple}
          onClickAdd={this.onClickAdd}
          onClickRemove={this.onClickRemove}
        />
        <input
          autoComplete="off"
          onChange={this.onChange}
          value={inputValue}
          ref={this.textInput}
        />
        <List
          searchResult={store.searchResult}
          showAvatar={this.config.showAvatars}
          onClick={this.onSelected}
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

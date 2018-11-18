import React from 'react';
import PropTypes from 'prop-types';

import List from './List.jsx';
import Selected from './Select.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.config = props.config;
    console.log(this.config);

    this.state = {
      searchResult: {},
      selected: null,
      inputValue: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.onAddClick = this.onAddClick.bind(this);

    this.textInput = React.createRef();
  }

  onChange(e) {
    const { value } = e.target;

    this.setState({ inputValue: value });

    if (value) {
      fetch(`/search?value=${value}`, { cache: 'no-cache' })
        .then(result => result.text())
        .then(result => this.setState({ searchResult: JSON.parse(result) }));
    } else {
      this.setState({ searchResult: {} });
    }
  }

  onSelected(id) {
    const { searchResult, selected } = this.state;
    if (!Object.is(selected, searchResult[id])) {
      this.setState({ selected: searchResult[id] });
    }
  }

  onAddClick() {
    this.setState({ inputValue: '' });
    this.textInput.current.focus();
  }

  render() {
    const { searchResult, selected, inputValue } = this.state;

    return (
      <div>
        <Selected
          selected={selected}
          onAddClick={this.onAddClick}
        />
        <input
          autoComplete="off"
          onChange={this.onChange}
          value={inputValue}
          ref={this.textInput}
        />
        <List
          searchResult={searchResult}
          onSelected={this.onSelected}
          showAvatar={this.config.showAvatars}
        />
      </div>
    );
  }
}

App.propTypes = {
  config: PropTypes.shape({
    multiple: PropTypes.bool,
  }).isRequired,
};

export default App;

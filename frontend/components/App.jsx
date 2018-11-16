import React from 'react';

import List from './List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchResult: {}, selected: null };

    this.onChange = this.onChange.bind(this);
    this.onSelected = this.onSelected.bind(this);
  }

  onChange(e) {
    const { value } = e.target;

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

  render() {
    const { searchResult, selected } = this.state;

    return (
      <div>
        {selected
          ? (
            <div>
              {selected.personalName}
              {' '}
              {selected.familyName}
            </div>
          )
          : (null)
        }
        <input
          autoComplete="off"
          onChange={this.onChange}
        />
        <List
          searchResult={searchResult}
          onSelected={this.onSelected}
        />
      </div>
    );
  }
}

export default App;

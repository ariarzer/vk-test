import React from 'react';

import List from './List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchResult: [] };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    fetch(`/search?value=${e.target.value}`, { cache: 'no-cache' })
      .then(result => result.text())
      .then(value => this.setState({ searchResult: JSON.parse(value) }));
  }

  render() {
    const { searchResult } = this.state;

    return (
      <div>
        <form>
          <input autoComplete="off" onChange={this.onChange} />
        </form>
        <List searchResult={searchResult} />
      </div>
    );
  }
}

export default App;

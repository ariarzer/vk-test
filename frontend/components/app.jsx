import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    fetch(`/search?value=${e.target.value}`, { cache: 'no-cache' })
      .then(result => result.text())
      .then(value => console.log(value));
  }

  render() {
    return (
      <div>
        <form>
          <input id="search" autoComplete="off" onChange={this.onChange}/>
        </form>
      </div>
    );
  }
}

export default App;
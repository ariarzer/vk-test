import React from 'react';
import PropTypes from 'prop-types';
import { createIcon } from '@download/blockies';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.onError = this.onError.bind(this);
  }

  onError(e) {
    const parent = e.target.parentNode;
    parent.removeChild(e.target);

    const icon = createIcon({
      seed: parent.innerHTML,
      size: 50 / 5,
      scale: 5,
    });
    parent.appendChild(icon);
  }

  render() {
    const { searchResult: res } = this.props;

    return (
      <div>
        <ul>
          {Object.keys(res).map(key => (
            <li>
              {res[key].personalName}
              {res[key].familyName}
              <img
                src={res[key].avatar}
                alt={`avatar ${res[key].personalName} ${res[key].familyName}`}
                onError={this.onError}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  searchResult: PropTypes.objectOf(PropTypes.object()).isRequired,
};

export default List;

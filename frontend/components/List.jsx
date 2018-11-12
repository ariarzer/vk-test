import React from 'react';

function List(props) {
  return (
    <div>
      <ul>{props.searchResult.map((item) => (<li>{item.familyName}</li>))}</ul>
    </div>
  );
}

export default List;

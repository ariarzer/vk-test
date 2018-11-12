import React from 'react';

function List(props) {
  const res = props.searchResult;

  return (
    <div>
      <ul>{Object.keys(res).map((key) => (<li>{res[key].personalName}  {res[key].familyName}</li>))}</ul>
    </div>
  );
}

export default List;

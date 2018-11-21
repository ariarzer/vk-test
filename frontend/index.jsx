import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store.js';

import Dropdown from './Dropdown/index.jsx';

const config = {
  multiple: true,
  showAvatars: false,
};

ReactDOM.render(
  <Provider store={store}>
    <div className="container">
      <Dropdown config={config} />
    </div>
  </Provider>,
  document.getElementById('root'),
);

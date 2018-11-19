import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store.js';

import Dropdown from './Dropdown/Dropdown.jsx';

const config = {
  multiple: true,
  showAvatars: false,
};

ReactDOM.render(
  <Provider store={store}>
    <Dropdown config={config} />
  </Provider>,
  document.getElementById('root'),
);

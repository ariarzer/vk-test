import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './style.css';

import store from './store/store.js';
import Dropdown from './Dropdown/index.jsx';

ReactDOM.render(
  <Provider store={store}>
    <div className="container">
      <Dropdown
        multiple
        showAvatar
      />
      <Dropdown
        multiple={false}
        showAvatar={false}
      />
    </div>
  </Provider>,
  document.getElementById('root'),
);

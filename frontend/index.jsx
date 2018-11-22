import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store.js';

import style from './style.css';

import Dropdown from './Dropdown/index.jsx';


ReactDOM.render(
  <Provider store={store}>
    <div className="container">
      <Dropdown
        multiple
        showAvatar={false}
      />
    </div>
  </Provider>,
  document.getElementById('root'),
);

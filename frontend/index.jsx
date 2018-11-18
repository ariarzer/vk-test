import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store.js';

import App from './components/App.jsx';

const config = {
  multiple: true,
  showAvatars: false,
};

ReactDOM.render(
  <Provider store={store}>
    <App config={config} />
  </Provider>,
  document.getElementById('root'),
);

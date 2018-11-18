import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';

const config = {
  multiple: true,
  showAvatars: false,
};

ReactDOM.render(
  <App config={config} />,
  document.getElementById('root'),
);

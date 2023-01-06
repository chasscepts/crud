import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Dialog from './lib/Dialog';
import Notification from './lib/Notification';
import store from './app/store';
import './assets/css/index.css';
import './assets/css/scrollbar.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Notification />
      <Dialog />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();

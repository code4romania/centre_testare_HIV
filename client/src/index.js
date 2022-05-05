import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './context';
import App from './App';
import '@fontsource/source-sans-pro';
import * as serviceWorker from './serviceWorker';
import { initializeGA } from './analyticsTracker';

initializeGA();
ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

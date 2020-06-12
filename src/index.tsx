import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import './index.css';
import App from './App';
import { IAppState } from './appReducer';
import { store } from './store';
import { makeFetchIdentity } from './identity/actions/makeFetchIdentity';

const url = window.location.origin
if (!url.includes('localhost') && !url.includes('https')) {
  window.location.href = `https:${url.split(':')[1]}`
}

(store.dispatch as ThunkDispatch<IAppState, void, Action>)(makeFetchIdentity());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();

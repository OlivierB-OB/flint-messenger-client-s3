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

(store.dispatch as ThunkDispatch<IAppState, void, Action>)(makeFetchIdentity());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();

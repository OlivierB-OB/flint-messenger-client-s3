import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './appReducer';

export const store = createStore(appReducer, applyMiddleware(thunk));

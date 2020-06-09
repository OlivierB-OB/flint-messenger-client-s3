import { combineReducers } from 'redux';
import { call } from './call/reducer';
import { conversations } from './conversations/reducer';
import { layout } from './layout/reducer';
import { login } from './login/reducer';
import { identity } from './identity/reducer';
import { profileForm } from './profileForm/reducer';
import { realtime } from './realtime/reducer';
import { users } from './users/reducer';

export const appReducer = combineReducers({
  call,
  conversations,
  layout,
  login,
  identity,
  profileForm,
  realtime,
  users,
});

export type IAppState = ReturnType<typeof appReducer>;

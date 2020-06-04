import { combineReducers } from 'redux';
import { layout } from './layout/reducer';
import { login } from './login/reducer';
import { identity } from './identity/reducer';
import { profileForm } from './profileForm/reducer';
import { users } from './users/reducer';
import { conversations } from './conversations/reducer';

export const appReducer = combineReducers({
  layout,
  login,
  identity,
  profileForm,
  users,
  conversations,
});

export type IAppState = ReturnType<typeof appReducer>;

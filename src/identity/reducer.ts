import { IIdentityState, IIdentityAction, UPDATE_IDENTITY, UPDATE_IDENTITY_STATUS, IDENTITY_RESET } from './types';
import { updateIdentityCase } from './cases/updateIdentityCase';
import { updateIdentityStatusCase } from './cases/updateIdentityStatusCase';
import { defaultIdentityState } from './utils';

export function identity(state: IIdentityState = defaultIdentityState(), action: IIdentityAction): IIdentityState {
  switch (action.type) {
    case IDENTITY_RESET:
      return defaultIdentityState();
    case UPDATE_IDENTITY:
      return updateIdentityCase(state, action);
    case UPDATE_IDENTITY_STATUS:
      return updateIdentityStatusCase(state, action);
    default:
      return state;
  }
}

import { IIdentityAction, UPDATE_IDENTITY, IIdentityState, UPDATE_IDENTITY_STATUS } from './types';
import { updateIdentityCase } from './cases/updateIdentityCase';
import { updateIdentityStatusCase } from './cases/updateIdentityStatusCase';

const defaultIdentity: IIdentityState = { status: 'unavailable' };

export function identity(state: IIdentityState = defaultIdentity, action: IIdentityAction): IIdentityState {
  switch (action.type) {
    case UPDATE_IDENTITY:
      return updateIdentityCase(state, action);
    case UPDATE_IDENTITY_STATUS:
      return updateIdentityStatusCase(state, action);
    default:
      return state;
  }
}

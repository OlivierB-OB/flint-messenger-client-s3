import { IIdentityResetAction, IDENTITY_RESET } from '../types';

export function identityReset(): IIdentityResetAction {
  return { type: IDENTITY_RESET };
}

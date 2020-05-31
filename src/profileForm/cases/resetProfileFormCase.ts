import { deepClone } from '../../utility/deepClone';
import { IProfileFormState, IResetProfileFormAction } from '../types';
import { defaultProfileForm } from './defaultProfileForm';

export function resetProfileFormCase(_: IProfileFormState, action: IResetProfileFormAction): IProfileFormState {
  const newState = deepClone(defaultProfileForm);
  if (action.info) {
    const { uid, firstName, lastName } = action.info;
    newState.fields.email.value = uid;
    newState.fields.firstName.value = firstName;
    newState.fields.lastName.value = lastName;
  }
  newState.status = 'ready';
  return newState;
}

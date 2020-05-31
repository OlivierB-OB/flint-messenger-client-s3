import { IProfileFormState, IResetProfileFormAction } from '../types';
import { defaultProfileForm } from './defaultProfileForm';

export function resetProfileFormCase(_: IProfileFormState, { info }: IResetProfileFormAction): IProfileFormState {
  const newState = defaultProfileForm();
  if (info) {
    const { uid, firstName, lastName } = info;
    newState.fields.email.value = uid;
    newState.fields.firstName.value = firstName;
    newState.fields.lastName.value = lastName;
  }
  newState.status = 'ready';
  return newState;
}

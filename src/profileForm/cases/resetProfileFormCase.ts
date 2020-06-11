import { IProfileFormState, IResetProfileFormContentAction } from '../types';
import { defaultProfileFormState } from '../utils';

export function resetProfileFormCase(
  _: IProfileFormState,
  { info }: IResetProfileFormContentAction,
): IProfileFormState {
  const newState = defaultProfileFormState();
  if (info) {
    const { email, firstName, lastName } = info;
    newState.fields.email.value = email;
    newState.fields.firstName.value = firstName;
    newState.fields.lastName.value = lastName;
    newState.optionalPassword = true;
  }
  newState.status = 'ready';
  return newState;
}

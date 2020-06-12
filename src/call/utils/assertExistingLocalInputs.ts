import { IAppState } from '../../appReducer';
import { ILocalInputs } from '../types';

export function assertExistingLocalInputs(appState: IAppState): ILocalInputs {
  const inputs = appState.call.inputs;
  if (!inputs) throw Error('No local inputs available');
  return inputs;
}

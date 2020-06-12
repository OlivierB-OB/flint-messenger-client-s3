import { IAppState } from '../../appReducer';
import { IRemotePeer } from '../types';

export function assertExistingRemote(appState: IAppState, target: string): IRemotePeer {
  const remote = appState.call.remotes.find((remote) => remote.target === target);
  if (!remote) throw Error('No remote peer available');
  return remote;
}

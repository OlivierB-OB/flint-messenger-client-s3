import { IAppState } from '../../appReducer';
import { ILocalScreenShare } from '../types';

export function assertExistingLocalScreenShare(appState: IAppState): ILocalScreenShare {
  const screenShare = appState.call.screenShare;
  if (!screenShare) throw Error('No local screen share available');
  return screenShare;
}

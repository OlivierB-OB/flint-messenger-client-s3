import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';

export const makeEmit = action((event: any, data: any) => {
  return async (_: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { socket } = getState().realtime;
    if (!socket) return;
    console.log(`emitting -------> [${event}]`);
    socket.emit(event, data);
  };
});

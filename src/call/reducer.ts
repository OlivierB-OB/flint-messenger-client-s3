import {
  ICallState,
  ICallAction,
  CALL_RESET,
  UPDATE_CALL_STATUS,
  UPDATE_CALL_LOCAL_INPUTS,
  UPDATE_CALL_REMOTE_STREAM,
  UPDATE_CALL_SCREEN_SHARE_STREAM,
  SET_CALL_CONVERSATION_ID,
  UPDATE_CALL_REMOTE,
  SET_INCOMING_CALL,
  TOGGLE_CALL_AUDIO_INPUT,
  TOGGLE_CALL_VIDEO_INPUT,
} from './types';
import { updateCallStatusCase } from './cases/updateCallStatusCase';
import { defaultCallState } from './utils/defaultCallState';
import { updateCallLocalInputsCase } from './cases/updateCallLocalInputsCase';
import { updateCallRemoteStreamCase } from './cases/updateCallRemoteStreamCase';
import { updateCallScreenShareStreamCase } from './cases/updateCallScreenShareStreamCase';
import { setCallConversationIdCase } from './cases/setCallConversationIdCase';
import { updateCallRemoteCase } from './cases/updateCallRemoteCase';
import { setIncomingCallCase } from './cases/setIncomingCallCase';
import { toggleCallAudioInputCase } from './cases/toggleCallAudioInputCase';
import { toggleCallVideoInputCase } from './cases/toggleCallVideoInputCase';

export function call(state: ICallState = defaultCallState(), action: ICallAction): ICallState {
  switch (action.type) {
    case CALL_RESET:
      return defaultCallState();
    case UPDATE_CALL_STATUS:
      return updateCallStatusCase(state, action);
    case SET_CALL_CONVERSATION_ID:
      return setCallConversationIdCase(state, action);
    case SET_INCOMING_CALL:
      return setIncomingCallCase(state, action);
    case UPDATE_CALL_LOCAL_INPUTS:
      return updateCallLocalInputsCase(state, action);
    case UPDATE_CALL_REMOTE:
      return updateCallRemoteCase(state, action);
    case UPDATE_CALL_REMOTE_STREAM:
      return updateCallRemoteStreamCase(state, action);
    case UPDATE_CALL_SCREEN_SHARE_STREAM:
      return updateCallScreenShareStreamCase(state, action);
    case TOGGLE_CALL_AUDIO_INPUT:
      return toggleCallAudioInputCase(state, action);
    case TOGGLE_CALL_VIDEO_INPUT:
      return toggleCallVideoInputCase(state, action);
    default:
      return state;
  }
}

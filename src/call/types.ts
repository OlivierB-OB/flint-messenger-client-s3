export type ICallStateStatus = 'unavailable' | 'ready' | 'incall';

export interface ILocalInput {
  isAvailable: boolean;
  isActive?: boolean;
  toggle?: () => ILocalInput;
}

export interface ILocalInputs {
  stream: MediaStream;
  audio: ILocalInput;
  video: ILocalInput;
}

export interface IIncomingCall {
  target: string;
  accept: () => void;
  reject: () => void;
}

export interface ICallState {
  status: ICallStateStatus;
  incomingCall?: IIncomingCall;
  conversationId?: string;
  target?: string;
  peerConnection?: RTCPeerConnection;
  localInputs?: ILocalInputs;
  remoteStream?: MediaStream;
  screenShareStream?: MediaStream;
}

export const CALL_RESET = 'CALL_RESET';
export const UPDATE_CALL_STATUS = 'UPDATE_CALL_STATUS';
export const SET_CALL_CONVERSATION_ID = 'SET_CALL_CONVERSATION_ID';
export const SET_CALL_TARGET = 'SET_CALL_TARGET';
export const SET_INCOMING_CALL = 'SET_INCOMING_CALL';
export const UPDATE_CALL_LOCAL_INPUTS = 'UPDATE_CALL_LOCAL_INPUTS';
export const UPDATE_CALL_PEER_CONNECTION = 'UPDATE_CALL_PEER_CONNECTION';
export const UPDATE_CALL_REMOTE_STREAM = 'UPDATE_CALL_REMOTE_STREAM';
export const UPDATE_CALL_SCREEN_SHARE_STREAM = 'UPDATE_CALL_SCREEN_SHARE_STREAM';
export const TOGGLE_CALL_AUDIO_INPUT = 'TOGGLE_CALL_AUDIO_INPUT';
export const TOGGLE_CALL_VIDEO_INPUT = 'TOGGLE_CALL_VIDEO_INPUT';

export interface ICallResetAction {
  type: typeof CALL_RESET;
}

export interface IUpdateCallStatusAction {
  type: typeof UPDATE_CALL_STATUS;
  status: ICallStateStatus;
}

export interface ISetCallConversationIdAction {
  type: typeof SET_CALL_CONVERSATION_ID;
  conversationId: string;
}

export interface ISetCallTargetAction {
  type: typeof SET_CALL_TARGET;
  target: string;
}

export interface ISetIncomingCallAction {
  type: typeof SET_INCOMING_CALL;
  incomingCall?: IIncomingCall;
}

export interface IUpdateCallLocalInputsAction {
  type: typeof UPDATE_CALL_LOCAL_INPUTS;
  localInputs?: ILocalInputs;
}

export interface IUpdateCallPeerConnectionAction {
  type: typeof UPDATE_CALL_PEER_CONNECTION;
  peerConnection?: RTCPeerConnection;
}

export interface IUpdateCallRemoteStreamAction {
  type: typeof UPDATE_CALL_REMOTE_STREAM;
  stream?: MediaStream;
}

export interface IUpdateCallScreenShareStreamAction {
  type: typeof UPDATE_CALL_SCREEN_SHARE_STREAM;
  stream?: MediaStream;
}

export interface IToggleCallAudioInputAction {
  type: typeof TOGGLE_CALL_AUDIO_INPUT;
}

export interface IToggleCallVideoInputAction {
  type: typeof TOGGLE_CALL_VIDEO_INPUT;
}

export type ICallAction = ICallResetAction | IUpdateCallStatusAction
  | ISetCallConversationIdAction
  | ISetCallTargetAction
  | ISetIncomingCallAction
| IUpdateCallLocalInputsAction
  | IUpdateCallPeerConnectionAction
 | IUpdateCallRemoteStreamAction
 | IUpdateCallScreenShareStreamAction
  | IToggleCallAudioInputAction
  | IToggleCallVideoInputAction;

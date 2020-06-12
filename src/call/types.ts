export type ICallStateStatus = 'unavailable' | 'ready' | 'incall';

export type IPeeringPurpose = 'call' | 'screenShare';

export interface ILocalInput {
  isAvailable: boolean;
  isActive?: boolean;
  toggle?: () => ILocalInput;
}

export interface ILocalInputs {
  stream: MediaStream;
  audio: ILocalInput;
  video: ILocalInput;
  close: () => void;
}

export interface ILocalScreenShare {
  stream: MediaStream;
  close: () => void;
}

export interface IIncomingCall {
  target: string;
  accept: () => void;
  reject: () => void;
}

export interface IRemotePeer {
  target: string;
  peerConnection?: RTCPeerConnection;
  stream?: MediaStream;
  screenSharePeer?: RTCPeerConnection;
  screenShare?: MediaStream;
  pendingJoin?: boolean;
  isDisconnected?: boolean;
}

export interface ICallState {
  status: ICallStateStatus;
  incomingCall?: IIncomingCall;
  conversationId?: string;
  inputs?: ILocalInputs;
  screenShare?: ILocalScreenShare;
  remotes: IRemotePeer[];
}

export const CALL_RESET = 'CALL_RESET';
export const UPDATE_CALL_STATUS = 'UPDATE_CALL_STATUS';
export const SET_CALL_CONVERSATION_ID = 'SET_CALL_CONVERSATION_ID';
export const SET_INCOMING_CALL = 'SET_INCOMING_CALL';
export const UPDATE_CALL_LOCAL_INPUTS = 'UPDATE_CALL_LOCAL_INPUTS';
export const UPDATE_CALL_REMOTE = 'UPDATE_CALL_REMOTE';
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

export interface ISetIncomingCallAction {
  type: typeof SET_INCOMING_CALL;
  incomingCall?: IIncomingCall;
}

export interface IUpdateCallLocalInputsAction {
  type: typeof UPDATE_CALL_LOCAL_INPUTS;
  localInputs?: ILocalInputs;
}

export interface IUpdateCallRemoteAction {
  type: typeof UPDATE_CALL_REMOTE;
  remote: IRemotePeer;
}

export interface IUpdateCallRemoteStreamAction {
  type: typeof UPDATE_CALL_REMOTE_STREAM;
  target: string;
  purpose: IPeeringPurpose;
  stream?: MediaStream;
}

export interface IUpdateCallScreenShareStreamAction {
  type: typeof UPDATE_CALL_SCREEN_SHARE_STREAM;
  screenShare?: ILocalScreenShare;
}

export interface IToggleCallAudioInputAction {
  type: typeof TOGGLE_CALL_AUDIO_INPUT;
}

export interface IToggleCallVideoInputAction {
  type: typeof TOGGLE_CALL_VIDEO_INPUT;
}

export type ICallAction = ICallResetAction | IUpdateCallStatusAction
  | ISetCallConversationIdAction
  | ISetIncomingCallAction
| IUpdateCallLocalInputsAction
  | IUpdateCallRemoteAction
 | IUpdateCallRemoteStreamAction
 | IUpdateCallScreenShareStreamAction
  | IToggleCallAudioInputAction
  | IToggleCallVideoInputAction;

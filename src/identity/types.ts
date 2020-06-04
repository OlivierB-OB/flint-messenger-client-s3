
export type IUserStatus = 'available' | 'incall' | 'offline';

export interface IProfile {
  _id: string;
  email: string;
  lastName: string;
  firstName: string;
  status: IUserStatus;
  updatedAt: string;
  conversationsSeen?: { [conversationId: string]: string };
}

export type IIdentityStatus = 'unavailable' | 'ready';

export interface IIdentityState {
  status: IIdentityStatus;
  info?: IProfile;
}

export const UPDATE_IDENTITY = 'UPDATE_IDENTITY';
export const UPDATE_IDENTITY_STATUS = 'UPDATE_IDENTITY_STATUS';

export interface IUpdateIdentityAction {
  type: typeof UPDATE_IDENTITY;
  info: Partial<IProfile>;
}

export interface IUpdateIdentityStatusAction {
  type: typeof UPDATE_IDENTITY_STATUS;
  status: IIdentityStatus;
}

export type IIdentityAction = IUpdateIdentityAction | IUpdateIdentityStatusAction;

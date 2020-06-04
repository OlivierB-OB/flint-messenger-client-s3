import { IIdentityState } from '../types';

// FIXME
export const defaultIdentity: IIdentityState = {
  status: 'ready',
  info: {
    _id: 'anything',
    // email: 'olivier.bernard.ob@gmail.com',
    firstName: 'Olivier',
    lastName: 'Bernard',
    status: 'available',
    updatedAt: new Date().toISOString(),
  },
};

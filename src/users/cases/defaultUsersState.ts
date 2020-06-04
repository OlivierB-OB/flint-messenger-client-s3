import { IUsersState } from '../types';

// FIXME
export const defaultUsersState: IUsersState = {
  status: 'unavailable',
  show: false,
  list: [
    {
      _id: 'pv1',
      lastName: 'Vannier',
      firstName: 'Pierre',
      status: 'available',
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'ac1',
      lastName: 'Castelltor',
      firstName: 'Arnaud',
      status: 'incall',
      updatedAt: new Date().toISOString(),
    },
  ],
};

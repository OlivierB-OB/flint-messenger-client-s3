import { IUsersState } from '../types';

// FIXME
export const defaultUsersState: IUsersState = {
  status: 'unavailable',
  show: false,
  list: [
    {
      uid: 'pv1',
      lastName: 'Vannier',
      firstName: 'Pierre',
      status: 'available',
    },
    {
      uid: 'ac1',
      lastName: 'Castelltor',
      firstName: 'Arnaud',
      status: 'incall',
    },
  ],
};

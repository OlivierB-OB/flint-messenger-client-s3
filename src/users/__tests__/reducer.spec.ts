import { users } from '../reducer';
import { defaultUsersState } from '../utils';
import { usersReset } from '../actions/usersReset';

describe('reducer', () => {
  it('should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(users(state, action)).toBe(state);
  });

  it('should provide a default state', async () => {
    const action: any = {};
    expect(users(undefined, action)).toEqual(defaultUsersState());
  });

  it('should support resetting the state', async () => {
    const state: any = {};
    expect(users(state, usersReset())).toEqual(defaultUsersState());
  });
});

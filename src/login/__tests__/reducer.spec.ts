import { login } from '../reducer';
import { defaultLoginState } from '../utils';
import { loginReset } from '../actions/loginReset';

describe('reducer', () => {
  it('should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(login(state, action)).toBe(state);
  });

  it('should provide a default state', async () => {
    const action: any = {};
    expect(login(undefined, action)).toEqual(defaultLoginState());
  });

  it('should support resetting the state', async () => {
    const state: any = {};
    expect(login(state, loginReset())).toEqual(defaultLoginState());
  });
});

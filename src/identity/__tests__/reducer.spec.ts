import { identity } from '../reducer';
import { defaultIdentityState } from '../utils';
import { identityReset } from '../actions/identityReset';

describe('reducer', () => {
  it('should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(identity(state, action)).toBe(state);
  });

  it('should provide a default state', async () => {
    const action: any = {};
    expect(identity(undefined, action)).toEqual(defaultIdentityState());
  });

  it('should support resetting the state', async () => {
    const state: any = {};
    expect(identity(state, identityReset())).toEqual(defaultIdentityState());
  });
});

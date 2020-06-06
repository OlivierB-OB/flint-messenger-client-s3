import { users } from '../reducer';

describe('reducer', () => {
  it('should should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(users(state, action)).toBe(state);
  });
});

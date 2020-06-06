import { login } from '../reducer';

describe('reducer', () => {
  it('should should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(login(state, action)).toBe(state);
  });
});

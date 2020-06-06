import { profileForm } from '../reducer';

describe('reducer', () => {
  it('should should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(profileForm(state, action)).toBe(state);
  });
});

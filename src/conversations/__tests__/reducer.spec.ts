import { conversations } from '../reducer';

describe('reducer', () => {
  it('should should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(conversations(state, action)).toBe(state);
  });
});

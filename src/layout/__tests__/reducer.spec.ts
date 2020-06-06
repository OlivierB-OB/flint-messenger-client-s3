import { layout } from '../reducer';

describe('reducer', () => {
  it('should should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(layout(state, action)).toBe(state);
  });
});

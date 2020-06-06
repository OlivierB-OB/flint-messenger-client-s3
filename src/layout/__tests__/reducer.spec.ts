import { layout } from '../reducer';
import { defaultLayoutState } from '../utils';
import { layoutReset } from '../actions/layoutReset';

describe('reducer', () => {
  it('should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(layout(state, action)).toBe(state);
  });

  it('should provide a default state', async () => {
    const action: any = {};
    expect(layout(undefined, action)).toEqual(defaultLayoutState());
  });

  it('should support resetting the state', async () => {
    const state: any = {};
    expect(layout(state, layoutReset())).toEqual(defaultLayoutState());
  });
});

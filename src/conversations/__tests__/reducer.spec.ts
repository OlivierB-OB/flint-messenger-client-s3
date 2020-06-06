import { conversations } from '../reducer';
import { defaultConversationsState } from '../utils';
import { conversationsReset } from '../actions/conversationsReset';

describe('reducer', () => {
  it('should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(conversations(state, action)).toBe(state);
  });

  it('should provide a default state', async () => {
    const action: any = {};
    expect(conversations(undefined, action)).toEqual(defaultConversationsState());
  });

  it('should support resetting the state', async () => {
    const state: any = {};
    expect(conversations(state, conversationsReset())).toEqual(defaultConversationsState());
  });
});

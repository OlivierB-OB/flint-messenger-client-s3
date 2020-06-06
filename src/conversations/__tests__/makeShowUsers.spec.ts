import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeShowConversationList } from '../actions/makeShowConversationList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeShowConversationList', () => {
  it('should allow opening the drawer and populating it with conversations', async () => {
    const store = mockStore({});

    store.dispatch(makeShowConversationList() as any);

    expect(store.getActions()).toEqual([
      {
        drawerContent: 'conversations',
        type: 'UPDATE_DRAWER_CONTENT',
      },
      {
        showDrawer: true,
        type: 'TOGGLE_DRAWER',
      },
    ]);
    store.clearActions();
  });
});

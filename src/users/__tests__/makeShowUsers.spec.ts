import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeShowUsers } from '../actions/makeShowUsers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeShowUsers', () => {
  it('should allow opening the drawer and populating it with contacts', async () => {
    const store = mockStore({});

    store.dispatch(makeShowUsers() as any);

    expect(store.getActions()).toEqual([
      {
        drawerContent: 'contacts',
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

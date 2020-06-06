import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeInitializeApplication } from '../actions/makeInitializeApplication';
import { makeFetchUsers } from '../../users/actions/makeFetchUsers';
import { makeFetchConversations } from '../../conversations/actions/makeFetchConversations';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeInitializeApplication', () => {
  let spyUsers: jest.Mock;
  let restoreUsers: () => void;
  let spyConversations: jest.Mock;
  let restoreConversations: () => void;

  beforeEach(() => {
    [spyUsers, restoreUsers] = makeFetchUsers.mock(jest.fn());
    [spyConversations, restoreConversations] = makeFetchConversations.mock(jest.fn());
  });

  afterEach(() => {
    restoreUsers();
    restoreConversations();
  });

  it('should fetch user identity then initialize application', async () => {
    const store = mockStore({});

    store.dispatch(makeInitializeApplication('the profile' as any) as any);

    expect(spyUsers).toHaveBeenCalled();
    expect(spyConversations).toHaveBeenCalled();

    expect(store.getActions()).toEqual([
      {
        info: 'the profile',
        type: 'UPDATE_IDENTITY',
      },
      {
        allowNavigation: true,
        type: 'TOGGLE_NAVIGATION',
      },
    ]);
    store.clearActions();
  });
});

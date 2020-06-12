import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeExitApplication } from '../actions/makeExitApplication';
import { mockHistory, IHistoryMock } from '../../utils/__mocks__';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeExitApplication', () => {
  let historyMock: IHistoryMock;

  beforeEach(() => {
    historyMock = mockHistory();
  });

  afterEach(() => {
    historyMock.restore();
  });

  it('should reset the application state then redirect to login', async () => {
    const store = mockStore({});

    store.dispatch(makeExitApplication() as any);

    expect(store.getActions()).toEqual([
      { type: 'CALL_RESET' },
      { type: 'CONVERSATIONS_RESET' },
      { type: 'IDENTITY_RESET' },
      { type: 'LAYOUT_RESET' },
      { type: 'LOGIN_RESET' },
      { type: 'PROFILE_FORM_RESET' },
      { type: 'REALTIME_RESET' },
      { type: 'USERS_RESET' },
    ]);
    store.clearActions();

    expect(historyMock.push).toHaveBeenCalledWith('/login');
  });
});

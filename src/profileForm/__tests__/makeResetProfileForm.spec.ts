import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeResetProfileForm } from '../actions/makeResetProfileForm';
import { makeExitApplication } from '../../layout/actions/makeExitApplication';
import { IAxiosMock, mockAxios, getDeffered, sleep } from '../../utils/__mocks__';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeResetProfileForm', () => {
  it('should reset the content of the profile form from the user identity', async () => {
    const store = mockStore({
      identity: {
        info: 'the user information',
      },
    });

    store.dispatch(makeResetProfileForm() as any);

    expect(store.getActions()).toEqual([
      {
        info: 'the user information',
        type: 'RESET_PROFILE_FORM_CONTENT',
      },
    ]);
    store.clearActions();
  });
});

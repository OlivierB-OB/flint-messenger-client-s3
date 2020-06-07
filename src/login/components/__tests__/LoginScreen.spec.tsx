import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { LoginScreen } from '../LoginScreen';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('LoginScreen', () => {
  let Connected: any = LoginScreen;

  it('should provide login status, registration status, callbacks to LoginScreenDisplay', async () => {
    const store = mockStore({
      login: {
        status: 'login status',
      },
      profileForm : {
        status: 'login status',
      },
    });
    const component = shallow(<Connected store={store} />).dive();
    expect(component).toMatchSnapshot();

    (component.prop('resetRegistrationForm') as any)();
    expect(store.getActions()).toEqual([
      {
        info: undefined,
        type: 'RESET_PROFILE_FORM_CONTENT',
      },
    ]);
    store.clearActions();
  });
});

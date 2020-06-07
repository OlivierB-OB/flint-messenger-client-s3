import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { LoginForm } from '../LoginForm';
import { makeSubmitLogin } from '../../actions/makeSubmitLogin';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('LoginForm', () => {
  let Connected: any = LoginForm;
  let spySubmit: jest.Mock;
  let restoreSubmit: () => void;

  beforeEach(() => {
    [spySubmit, restoreSubmit] = makeSubmitLogin.mock(jest.fn());
  });

  afterEach(() => {
    restoreSubmit();
  });

  it('should provide status, email, password and callbacks to LoginFormDisplay', async () => {
    const store = mockStore({
      login: {
        status: 'login status',
        email: 'login email',
        password: 'login password',
      },
    });
    const component = shallow(<Connected store={store} />).dive();
    expect(component).toMatchSnapshot();

    (component.prop('update') as any)('field to update', 'new value');
    expect(store.getActions()).toEqual([
      {
        field: 'field to update',
        value: 'new value',
        type: 'LOGIN_UPDATE_FORM',
      },
    ]);
    store.clearActions();

    (component.prop('submit') as any)();
    expect(spySubmit).toHaveBeenCalled();
  });
});

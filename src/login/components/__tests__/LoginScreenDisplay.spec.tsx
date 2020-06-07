import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { LoginScreenDisplay } from '../LoginScreen';
import { defaultLoginState } from '../../utils';
import { defaultProfileFormState } from '../../../profileForm/utils';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('LoginScreenDisplay', () => {
  it('should display the login form', async () => {
    const props: any = {
      loginStatus: 'login status',
      registrationStatus: 'registration status',
      resetRegistrationForm: jest.fn(),
    };
    const component = shallow(<LoginScreenDisplay {...props} />);
    expect(component).toMatchSnapshot();

    component.find(Tabs).simulate('change', undefined, 1);
    expect(component).toMatchSnapshot();
  });

  it('should display as loading if login status is unavailable', async () => {
    const props: any = {
      loginStatus: 'unavailable',
      registrationStatus: 'registration status',
      resetRegistrationForm: jest.fn(),
    };
    const component = shallow(<LoginScreenDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should display as loading if registration status is unavailable', async () => {
    const props: any = {
      loginStatus: 'login status',
      registrationStatus: 'unavailable',
      resetRegistrationForm: jest.fn(),
    };
    const component = shallow(<LoginScreenDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should reset the registration form on load', async () => {
    const props: any = {
      loginStatus: 'login status',
      registrationStatus: 'login status',
      resetRegistrationForm: jest.fn(),
    };

    const store = mockStore({
      login: defaultLoginState(),
      profileForm: defaultProfileFormState(),
    });

    mount(
      <Provider store={store}>
        <LoginScreenDisplay {...props} />
      </Provider>,
    );
    expect(props.resetRegistrationForm).toHaveBeenCalled();
  });
});

import TextField from '@material-ui/core/TextField';
import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { LoginFormDisplay } from '../LoginForm';

describe('LoginFormDisplay', () => {
  it('should display the login form', async () => {
    const props: any = {
      status: 'the status',
      email: {
        value: 'email value',
        isValid: true,
      },
      password: {
        value: 'password value',
        isValid: true,
      },
      update: 'update',
      submit: 'submit',
    };
    const component = shallow(<LoginFormDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should display the login form errors', async () => {
    const props: any = {
      status: 'the status',
      email: {
        value: 'email value',
        isValid: false,
        error: 'email error',
      },
      password: {
        value: 'password value',
        isValid: false,
        error: 'password error',
      },
      update: 'update',
      submit: 'submit',
    };
    const component = shallow(<LoginFormDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should allow editing the email value', async () => {
    const data: any = {
      status: 'the status',
      email: {
        value: 'email value',
        isValid: true,
      },
      password: {
        value: 'password value',
        isValid: true,
      },
      update: jest.fn(),
    };
    const component = shallow(<LoginFormDisplay {...data} />);
    component
      .find(TextField)
      .at(0)
      .simulate('change', { target: { value: 'new value' } });
    expect(data.update).toHaveBeenCalledWith('email', 'new value');
  });

  it('should allow editing the password value', async () => {
    const data: any = {
      status: 'the status',
      email: {
        value: 'email value',
        isValid: true,
      },
      password: {
        value: 'password value',
        isValid: true,
      },
      update: jest.fn(),
    };
    const component = shallow(<LoginFormDisplay {...data} />);
    component
      .find(TextField)
      .at(1)
      .simulate('change', { target: { value: 'new value' } });
    expect(data.update).toHaveBeenCalledWith('password', 'new value');
  });

  it('should allow submitting', async () => {
    const props: any = {
      status: 'the status',
      email: {
        value: 'email value',
        isValid: true,
      },
      password: {
        value: 'password value',
        isValid: true,
      },
      submit: jest.fn(),
    };
    const component = shallow(<LoginFormDisplay {...props} />);
    expect(component.find(Button).at(0).prop('type')).toEqual('submit');
    component.find('form').simulate('submit', { preventDefault: () => null });
    expect(props.submit).toHaveBeenCalled();
  });
});

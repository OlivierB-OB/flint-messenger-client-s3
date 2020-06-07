import { login } from '../reducer';
import { loginUpdateForm } from '../actions/loginUpdateForm';
import { defaultLoginState } from '../utils';

describe('loginUpdateForm', () => {
  it('should allow updating login form field email', async () => {
    expect(
      login(
        {
          ...defaultLoginState(),
          status: 'ready',
        },
        loginUpdateForm('email', 'test'),
      ),
    ).toEqual({
      status: 'ready',
      form: {
        email: {
          value: 'test',
          isValid: true,
        },
        password: {
          value: '',
          isValid: true,
        },
      },
    });
  });

  it('should validate the field email on update', async () => {
    const defaultState = defaultLoginState();
    expect(login({ ...defaultState }, loginUpdateForm('email', ''))).toEqual({
      ...defaultState,
      form: {
        ...defaultState.form,
        email: {
          value: '',
          isValid: false,
          error: 'this field is required',
        },
      },
    });
  });

  it('should allow updating login form field password', async () => {
    expect(
      login(
        {
          ...defaultLoginState(),
          status: 'ready',
        },
        loginUpdateForm('password', 'test'),
      ),
    ).toEqual({
      status: 'ready',
      form: {
        email: {
          value: '',
          isValid: true,
        },
        password: {
          value: 'test',
          isValid: true,
        },
      },
    });
  });

  it('should validate the field password on update', async () => {
    const defaultState = defaultLoginState();
    expect(login({ ...defaultState }, loginUpdateForm('password', ''))).toEqual({
      ...defaultState,
      form: {
        ...defaultState.form,
        password: {
          value: '',
          isValid: false,
          error: 'this field is required',
        },
      },
    });
  });
});

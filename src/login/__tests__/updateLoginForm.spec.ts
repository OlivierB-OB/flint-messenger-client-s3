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
        email: 'test',
        password: '',
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
        email: '',
        password: 'test',
      },
    });
  });
});

import { login } from '../reducer';
import { loginUpdateForm } from '../actions/loginUpdateForm';

describe('loginUpdateForm', () => {
  it('should allow updating login form field email', async () => {
    expect(
      login(
        {
          status: 'ready',
          form: {
            email: '',
            password: '',
          },
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
          status: 'ready',
          form: {
            email: '',
            password: '',
          },
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

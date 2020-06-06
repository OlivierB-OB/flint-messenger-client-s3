import { login } from '../reducer';
import { updateLoginStatus } from '../actions/updateLoginStatus';

describe('updateLoginStatus', () => {
  it('should allow updating login status', async () => {
    expect(
      login(
        {
          status: 'unavailable',
          form: {
            email: '',
            password: '',
          },
        },
        updateLoginStatus('ready'),
      ),
    ).toEqual({
      status: 'ready',
      form: {
        email: '',
        password: '',
      },
    });
  });
});

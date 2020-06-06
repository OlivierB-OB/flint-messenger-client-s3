import { login } from '../reducer';
import { updateLoginStatus } from '../actions/updateLoginStatus';
import { defaultLoginState } from '../utils';

describe('updateLoginStatus', () => {
  it('should allow updating login status', async () => {
    expect(
      login(
        {
          ...defaultLoginState(),
          status: 'unavailable',
        },
        updateLoginStatus('ready'),
      ),
    ).toEqual({
      ...defaultLoginState(),
      status: 'ready',
    });
  });
});

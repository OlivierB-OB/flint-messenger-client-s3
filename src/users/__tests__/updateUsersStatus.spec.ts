import { users } from '../reducer';
import { updateUsersStatus } from '../actions/updateUsersStatus';

describe('updateUsersStatus', () => {
  it('should allow updating profileForm status', async () => {
    expect(
      users(
        {
          status: 'unavailable',
          list: [],
        },
        updateUsersStatus('ready'),
      ),
    ).toEqual({
      list: [],
      status: 'ready',
    });
  });
});

import { users } from '../reducer';
import { updateUsersStatus } from '../actions/updateUsersStatus';
import { defaultUsersState } from '../utils';

describe('updateUsersStatus', () => {
  it('should allow updating profileForm status', async () => {
    expect(
      users(
        {
          ...defaultUsersState(),
          status: 'unavailable',
        },
        updateUsersStatus('ready'),
      ),
    ).toEqual({
      ...defaultUsersState(),
      status: 'ready',
    });
  });
});

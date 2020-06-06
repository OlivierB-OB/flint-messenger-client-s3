import { identity } from '../reducer';
import { updateIdentityStatus } from '../actions/updateIdentityStatus';
import { defaultIdentityState } from '../utils';

describe('updateIdentityStatus', () => {
  it('should allow updating identity status', async () => {
    expect(
      identity(
        {
          ...defaultIdentityState(),
          status: 'unavailable',
        },
        updateIdentityStatus('ready'),
      ),
    ).toEqual({
      ...defaultIdentityState(),
      status: 'ready',
    });
  });
});

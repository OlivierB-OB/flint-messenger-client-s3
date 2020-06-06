import { identity } from '../reducer';
import { updateIdentityStatus } from '../actions/updateIdentityStatus';

describe('updateIdentityStatus', () => {
  it('should allow updating identity status', async () => {
    expect(identity({ status: 'unavailable' }, updateIdentityStatus('ready'))).toEqual({
      status: 'ready',
    });
  });
});

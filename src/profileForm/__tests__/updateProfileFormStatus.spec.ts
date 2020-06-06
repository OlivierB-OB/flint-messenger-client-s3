import { profileForm } from '../reducer';
import { updateProfileFormStatus } from '../actions/updateProfileFormStatus';
import { defaultProfileFormState } from '../utils';

describe('updateProfileFormStatus', () => {
  it('should allow updating profileForm status', async () => {
    expect(
      profileForm(
        {
          ...defaultProfileFormState(),
          status: 'unavailable',
        },
        updateProfileFormStatus('ready'),
      ),
    ).toEqual({
      ...defaultProfileFormState(),
      status: 'ready',
    });
  });
});

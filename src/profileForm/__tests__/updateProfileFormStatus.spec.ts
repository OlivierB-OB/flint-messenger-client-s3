import { profileForm } from '../reducer';
import { updateProfileFormStatus } from '../actions/updateProfileFormStatus';
import { defaultProfileForm } from '../cases/defaultProfileForm';

describe('updateProfileFormStatus', () => {
  it('should allow updating profileForm status', async () => {
    expect(
      profileForm(
        {
          ...defaultProfileForm(),
          status: 'unavailable',
        },
        updateProfileFormStatus('ready'),
      ),
    ).toEqual({
      ...defaultProfileForm(),
      status: 'ready',
    });
  });
});

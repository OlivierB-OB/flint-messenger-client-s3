import { profileForm } from '../reducer';
import { defaultProfileFormState } from '../utils';
import { profileFormReset } from '../actions/profileFormReset';

describe('reducer', () => {
  it('should support unknow action', async () => {
    const state: any = {};
    const action: any = {};
    expect(profileForm(state, action)).toBe(state);
  });

  it('should provide a default state', async () => {
    const action: any = {};
    expect(profileForm(undefined, action)).toEqual(defaultProfileFormState());
  });

  it('should support resetting the state', async () => {
    const state: any = {};
    expect(profileForm(state, profileFormReset())).toEqual(defaultProfileFormState());
  });
});

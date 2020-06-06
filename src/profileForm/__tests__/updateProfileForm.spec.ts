import { profileForm } from '../reducer';
import { updateProfileForm } from '../actions/updateProfileForm';
import { defaultProfileFormState } from '../utils';

describe('updateProfileForm', () => {
  it('should allow updating profile field email', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('email', 'test@test.com'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        email: {
          value: 'test@test.com',
          isValid: true,
        },
      },
    });
  });

  it('should validate the field email on update', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('email', 'test'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        email: {
          value: 'test',
          isValid: false,
          error: 'expecting a valid email address',
        },
      },
    });
  });

  it('should allow updating profile field firstName', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('firstName', 'bar'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        firstName: {
          value: 'bar',
          isValid: true,
        },
      },
    });
  });

  it('should validate the field firstName on update', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('firstName', '222'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        firstName: {
          value: '222',
          isValid: false,
          error: 'expecting 1..20 characters in a..z',
        },
      },
    });
  });

  it('should allow updating profile field lastName', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('lastName', 'foo'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        lastName: {
          value: 'foo',
          isValid: true,
        },
      },
    });
  });

  it('should validate the field lastName on update', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('lastName', '222'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        lastName: {
          value: '222',
          isValid: false,
          error: 'expecting 1..20 characters in a..z',
        },
      },
    });
  });

  it('should allow updating profile field password', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('password', 'aB1/aB1/'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        password: {
          value: 'aB1/aB1/',
          isValid: true,
          hasLower: true,
          hasUpper: true,
          hasNumber: true,
          hasSymbol: true,
          hasValidLength: true,
        },
        confirmation: {
          value: '',
          isValid: false,
          error: 'password confirmation does not match',
        },
      },
    });
  });

  it('should validate the field password on update - lower', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('password', 'aaaaaaaa'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        password: {
          value: 'aaaaaaaa',
          isValid: false,
          hasLower: true,
          hasUpper: false,
          hasNumber: false,
          hasSymbol: false,
          hasValidLength: true,
          error: 'must meet the minimum requirements',
        },
        confirmation: {
          value: '',
          isValid: false,
          error: 'password confirmation does not match',
        },
      },
    });
  });

  it('should validate the field password on update - upper', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('password', 'AAAAAAAA'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        password: {
          value: 'AAAAAAAA',
          isValid: false,
          hasLower: false,
          hasUpper: true,
          hasNumber: false,
          hasSymbol: false,
          hasValidLength: true,
          error: 'must meet the minimum requirements',
        },
        confirmation: {
          value: '',
          isValid: false,
          error: 'password confirmation does not match',
        },
      },
    });
  });

  it('should validate the field password on update - number', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('password', '11111111'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        password: {
          value: '11111111',
          isValid: false,
          hasLower: false,
          hasUpper: false,
          hasNumber: true,
          hasSymbol: false,
          hasValidLength: true,
          error: 'must meet the minimum requirements',
        },
        confirmation: {
          value: '',
          isValid: false,
          error: 'password confirmation does not match',
        },
      },
    });
  });

  it('should validate the field password on update - symbol', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('password', '********'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        password: {
          value: '********',
          isValid: false,
          hasLower: false,
          hasUpper: false,
          hasNumber: false,
          hasSymbol: true,
          hasValidLength: true,
          error: 'must meet the minimum requirements',
        },
        confirmation: {
          value: '',
          isValid: false,
          error: 'password confirmation does not match',
        },
      },
    });
  });

  it('should validate the field password on update - length', async () => {
    const defaultState = defaultProfileFormState();
    expect(profileForm({ ...defaultState }, updateProfileForm('password', 'aA1/aA1'))).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        password: {
          value: 'aA1/aA1',
          isValid: false,
          hasLower: true,
          hasUpper: true,
          hasNumber: true,
          hasSymbol: true,
          hasValidLength: false,
          error: 'must meet the minimum requirements',
        },
        confirmation: {
          value: '',
          isValid: false,
          error: 'password confirmation does not match',
        },
      },
    });
  });

  it('should allow updating profile field confirmation', async () => {
    const defaultState = defaultProfileFormState();
    expect(
      profileForm(
        {
          ...defaultState,
          fields: {
            ...defaultState.fields,
            password: {
              value: 'foo',
              isValid: true,
              hasLower: false,
              hasUpper: false,
              hasNumber: false,
              hasSymbol: false,
              hasValidLength: false,
            },
          },
        },
        updateProfileForm('confirmation', 'foo'),
      ),
    ).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        password: {
          value: 'foo',
          isValid: true,
          hasLower: false,
          hasUpper: false,
          hasNumber: false,
          hasSymbol: false,
          hasValidLength: false,
        },
        confirmation: {
          value: 'foo',
          isValid: true,
        },
      },
    });
  });

  it('should validate the field confirmation on update', async () => {
    const defaultState = defaultProfileFormState();
    expect(
      profileForm(
        {
          ...defaultState,
          fields: {
            ...defaultState.fields,
            password: {
              value: 'foo',
              isValid: true,
              hasLower: false,
              hasUpper: false,
              hasNumber: false,
              hasSymbol: false,
              hasValidLength: false,
            },
          },
        },
        updateProfileForm('confirmation', 'bar'),
      ),
    ).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        password: {
          value: 'foo',
          isValid: true,
          hasLower: false,
          hasUpper: false,
          hasNumber: false,
          hasSymbol: false,
          hasValidLength: false,
        },
        confirmation: {
          value: 'bar',
          isValid: false,
          error: 'password confirmation does not match',
        },
      },
    });
  });

  it('should validate the field confirmation on password update', async () => {
    const defaultState = defaultProfileFormState();
    expect(
      profileForm(
        {
          ...defaultState,
          fields: {
            ...defaultState.fields,
            password: {
              value: 'foo',
              isValid: true,
              hasLower: false,
              hasUpper: false,
              hasNumber: false,
              hasSymbol: false,
              hasValidLength: false,
            },
            confirmation: {
              value: 'foo',
              isValid: true,
            },
          },
        },
        updateProfileForm('password', 'bar'),
      ),
    ).toEqual({
      ...defaultState,
      fields: {
        ...defaultState.fields,
        password: {
          value: 'bar',
          isValid: false,
          hasLower: true,
          hasUpper: false,
          hasNumber: false,
          hasSymbol: false,
          hasValidLength: false,
          error: 'must meet the minimum requirements',
        },
        confirmation: {
          value: 'foo',
          isValid: false,
          error: 'password confirmation does not match',
        },
      },
    });
  });
});

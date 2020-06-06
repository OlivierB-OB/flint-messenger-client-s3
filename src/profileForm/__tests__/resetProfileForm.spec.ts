import { profileForm } from '../reducer';
import { resetProfileFormContent } from '../actions/resetProfileFormContent';
import { defaultProfileFormState } from '../utils';

describe('resetProfileForm', () => {
  it('should allow reseting the profileForm content', async () => {
    expect(
      profileForm(
        {
          ...defaultProfileFormState(),
          status: 'unavailable',
          fields: {
            email: {
              value: 'test',
              isValid: false,
            },
            firstName: {
              value: 'test',
              isValid: false,
            },
            lastName: {
              value: 'test',
              isValid: false,
            },
            password: {
              value: 'test',
              isValid: false,
              hasLower: true,
              hasUpper: true,
              hasNumber: true,
              hasSymbol: true,
              hasValidLength: true,
            },
            confirmation: {
              value: 'test',
              isValid: false,
            },
          },
        },
        resetProfileFormContent({
          _id: '1234',
          email: 'test@test.com',
          firstName: 'foo',
          lastName: 'bar',
          status: 'available',
          updatedAt: 'any date',
        }),
      ),
    ).toEqual({
      ...defaultProfileFormState(),
      status: 'ready',
      fields: {
        ...defaultProfileFormState().fields,
        email: {
          value: 'test@test.com',
          isValid: true,
        },
        firstName: {
          value: 'foo',
          isValid: true,
        },
        lastName: {
          value: 'bar',
          isValid: true,
        },
      },
    });
  });

  it('should support an undefined identity', async () => {
    expect(
      profileForm(
        {
          ...defaultProfileFormState(),
          status: 'unavailable',
          fields: {
            email: {
              value: 'test',
              isValid: false,
            },
            firstName: {
              value: 'test',
              isValid: false,
            },
            lastName: {
              value: 'test',
              isValid: false,
            },
            password: {
              value: 'test',
              isValid: false,
              hasLower: true,
              hasUpper: true,
              hasNumber: true,
              hasSymbol: true,
              hasValidLength: true,
            },
            confirmation: {
              value: 'test',
              isValid: false,
            },
          },
        },
        resetProfileFormContent(undefined),
      ),
    ).toEqual({
      ...defaultProfileFormState(),
      status: 'ready',
    });
  });
});

import { profileForm } from '../reducer';
import { resetProfileForm } from '../actions/resetProfileForm';

describe('resetProfileForm', () => {
  it('should allow reseting the profileForm content', async () => {
    expect(
      profileForm(
        {
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
        resetProfileForm({
          _id: '1234',
          email: 'test@test.com',
          firstName: 'foo',
          lastName: 'bar',
          status: 'available',
          updatedAt: 'any date',
        }),
      ),
    ).toEqual({
      status: 'ready',
      fields: {
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
        password: {
          value: '',
          isValid: true,
          hasLower: false,
          hasUpper: false,
          hasNumber: false,
          hasSymbol: false,
          hasValidLength: false,
        },
        confirmation: {
          value: '',
          isValid: true,
        },
      },
    });
  });
});

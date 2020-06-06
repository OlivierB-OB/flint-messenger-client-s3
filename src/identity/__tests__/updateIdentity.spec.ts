import { identity } from '../reducer';
import { updateIdentity } from '../actions/updateIdentity';
import { defaultIdentityState } from '../utils';

describe('updateIdentity', () => {
  it('should allow updating user profile', async () => {
    expect(
      identity(
        defaultIdentityState(),
        updateIdentity({
          _id: '1234',
          firstName: 'Foo',
          lastName: 'Bar',
          status: 'available',
          updatedAt: 'anydate',
        }),
      ),
    ).toEqual({
      ...defaultIdentityState(),
      status: 'ready',
      info: {
        _id: '1234',
        firstName: 'Foo',
        lastName: 'Bar',
        status: 'available',
        updatedAt: 'anydate',
      },
    });
  });

  it('should merge informations', async () => {
    expect(
      identity(
        {
          ...defaultIdentityState(),
          status: 'ready',
          info: {
            _id: '1234',
            email: 'test@test.com',
            firstName: 'Foo',
            lastName: 'Bar',
            status: 'offline',
            updatedAt: 'anydate',
          },
        },
        updateIdentity({
          _id: '1234',
          firstName: 'Foo',
          lastName: 'Bar',
          status: 'available',
          updatedAt: 'anynewdate',
        }),
      ),
    ).toEqual({
      ...defaultIdentityState(),
      status: 'ready',
      info: {
        _id: '1234',
        email: 'test@test.com',
        firstName: 'Foo',
        lastName: 'Bar',
        status: 'available',
        updatedAt: 'anynewdate',
      },
    });
  });
});

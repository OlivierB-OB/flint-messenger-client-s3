import { identity } from '../reducer';
import { updateIdentity } from '../actions/updateIdentity';

describe('updateIdentity', () => {
  it('should allow updating user profile', async () => {
    expect(
      identity(
        { status: 'unavailable' },
        updateIdentity({
          _id: '1234',
          firstName: 'Foo',
          lastName: 'Bar',
          status: 'available',
          updatedAt: 'anydate',
        }),
      ),
    ).toEqual({
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

import { users } from '../reducer';
import { updateUserInfo } from '../actions/updateUserInfo';

describe('updateUserInfo', () => {
  it('should allow updating user info - add 1', async () => {
    expect(
      users(
        {
          status: 'ready',
          list: [],
        },
        updateUserInfo([
          {
            _id: '1234',
            firstName: 'foo',
            lastName: 'bar',
            status: 'available',
            updatedAt: '2020-06-05T00:00:00.000Z',
          },
        ]),
      ),
    ).toEqual({
      status: 'ready',
      list: [
        {
          _id: '1234',
          firstName: 'foo',
          lastName: 'bar',
          status: 'available',
          updatedAt: '2020-06-05T00:00:00.000Z',
        },
      ],
    });
  });

  it('should allow updating user info - add 2', async () => {
    expect(
      users(
        {
          status: 'ready',
          list: [
            {
              _id: '4321',
              firstName: 'foofoo',
              lastName: 'barbar',
              status: 'offline',
              updatedAt: '2020-06-05T00:00:00.000Z',
            },
          ],
        },
        updateUserInfo([
          {
            _id: '1234',
            firstName: 'foo',
            lastName: 'bar',
            status: 'available',
            updatedAt: '2020-06-05T12:00:00.000Z',
          },
        ]),
      ),
    ).toEqual({
      status: 'ready',
      list: [
        {
          _id: '1234',
          firstName: 'foo',
          lastName: 'bar',
          status: 'available',
          updatedAt: '2020-06-05T12:00:00.000Z',
        },
        {
          _id: '4321',
          firstName: 'foofoo',
          lastName: 'barbar',
          status: 'offline',
          updatedAt: '2020-06-05T00:00:00.000Z',
        },
      ],
    });
  });

  it('should allow updating user info - replace', async () => {
    expect(
      users(
        {
          status: 'ready',
          list: [
            {
              _id: '4321',
              firstName: 'foofoo',
              lastName: 'barbar',
              status: 'offline',
              updatedAt: '2020-06-05T00:00:00.000Z',
            },
            {
              _id: '1234',
              firstName: 'foo',
              lastName: 'bar',
              status: 'offline',
              updatedAt: '2020-06-04T00:00:00.000Z',
            },
          ],
        },
        updateUserInfo([
          {
            _id: '1234',
            firstName: 'foo',
            lastName: 'bar',
            status: 'available',
            updatedAt: '2020-06-05T12:00:00.000Z',
          },
        ]),
      ),
    ).toEqual({
      status: 'ready',
      list: [
        {
          _id: '1234',
          firstName: 'foo',
          lastName: 'bar',
          status: 'available',
          updatedAt: '2020-06-05T12:00:00.000Z',
        },
        {
          _id: '4321',
          firstName: 'foofoo',
          lastName: 'barbar',
          status: 'offline',
          updatedAt: '2020-06-05T00:00:00.000Z',
        },
      ],
    });
  });

  it('should allow updating user info - add replace', async () => {
    expect(
      users(
        {
          status: 'ready',
          list: [
            {
              _id: '4321',
              firstName: 'foofoo',
              lastName: 'barbar',
              status: 'offline',
              updatedAt: '2020-06-05T00:00:00.000Z',
            },
            {
              _id: '1234',
              firstName: 'foo',
              lastName: 'bar',
              status: 'offline',
              updatedAt: '2020-06-04T00:00:00.000Z',
            },
          ],
        },
        updateUserInfo([
          {
            _id: '1234',
            firstName: 'foo',
            lastName: 'bar',
            status: 'available',
            updatedAt: '2020-06-05T12:00:00.000Z',
          },
          {
            _id: '4444',
            firstName: 'baz',
            lastName: 'bazbaz',
            status: 'offline',
            updatedAt: '2020-06-05T15:00:00.000Z',
          },
        ]),
      ),
    ).toEqual({
      status: 'ready',
      list: [
        {
          _id: '4444',
          firstName: 'baz',
          lastName: 'bazbaz',
          status: 'offline',
          updatedAt: '2020-06-05T15:00:00.000Z',
        },
        {
          _id: '1234',
          firstName: 'foo',
          lastName: 'bar',
          status: 'available',
          updatedAt: '2020-06-05T12:00:00.000Z',
        },
        {
          _id: '4321',
          firstName: 'foofoo',
          lastName: 'barbar',
          status: 'offline',
          updatedAt: '2020-06-05T00:00:00.000Z',
        },
      ],
    });
  });
});

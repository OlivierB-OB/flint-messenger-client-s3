import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { ContactAvatar } from '../ContactAvatar';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ContactAvatar', () => {
  let Connected: any = ContactAvatar;

  it('should show the contact avatar', async () => {
    const store = mockStore({
      identity: {},
      users: {
        list: [
          {
            _id: '123',
            firstName: 'foo',
            lastName: 'bar',
          },
        ],
      },
    });
    const component = shallow(<Connected store={store} target="123" />);
    expect(component).toMatchSnapshot();
  });

  it('should support unknown contacts', async () => {
    const store = mockStore({
      identity: {},
      users: {
        list: [
          {
            _id: '222',
            firstName: 'foo',
            lastName: 'bar',
          },
        ],
      },
    });
    const component = shallow(<Connected store={store} target="123" />);
    expect(component).toMatchSnapshot();
  });

  it('should works the profile as well', async () => {
    const store = mockStore({
      identity: {
        info: {
          _id: '123',
          firstName: 'foo',
          lastName: 'bar',
        },
      },
    });
    const component = shallow(<Connected store={store} target="123" />);
    expect(component).toMatchSnapshot();
  });
});

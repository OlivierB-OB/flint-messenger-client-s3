import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { MyContactsButton } from '../MyContactsButton';
import { makeShowUsers } from '../../actions/makeShowUsers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MyContactsButton', () => {
  let Connected: any = MyContactsButton;
  let spyShowUsers: jest.Mock;
  let restoreShowUsers: () => void;

  beforeEach(() => {
    [spyShowUsers, restoreShowUsers] = makeShowUsers.mock(jest.fn());
  });

  afterEach(() => {
    restoreShowUsers();
  });

  it('should provide showContactList function to ShowContactsButton', async () => {
    const store = mockStore({});
    const component = shallow(<Connected store={store} />);
    (component.prop('showContactList') as any)();
    expect(spyShowUsers).toHaveBeenCalledWith();
  });
});

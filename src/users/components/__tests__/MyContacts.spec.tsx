import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { MyContacts } from '../MyContacts';
import { makeCreateConversation } from '../../../conversations/actions/makeCreateConversation';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MyContacts', () => {
  let Connected: any = MyContacts;
  let spyCreateConversation: jest.Mock;
  let restoreCreateConversation: () => void;

  beforeEach(() => {
    [spyCreateConversation, restoreCreateConversation] = makeCreateConversation.mock(jest.fn());
  });

  afterEach(() => {
    restoreCreateConversation();
  });

  it('should provide the status, user list and a createConversation function to UserList', async () => {
    const store = mockStore({
      users: {
        status: 'the status',
        list: 'the user list',
      },
    });
    const component = shallow(<Connected store={store} />).dive();
    expect(component).toMatchSnapshot();
    (component.prop('createConversation') as any)('123');
    expect(spyCreateConversation).toHaveBeenCalledWith('123');
  });
});

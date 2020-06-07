import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { MyConversations } from '../MyConversations';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MyConversations', () => {
  let Connected: any = MyConversations;

  it('should provide the status, conversation list to ConversationList', async () => {
    const store = mockStore({
      conversations: {
        status: 'the status',
        conversations: 'the conversation list',
      },
    });
    const component = shallow(<Connected store={store} />).dive();
    expect(component).toMatchSnapshot();
  });
});

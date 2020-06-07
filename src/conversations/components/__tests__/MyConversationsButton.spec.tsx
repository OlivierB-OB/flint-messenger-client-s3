import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { MyConversationsButton } from '../MyConversationsButton';
import { makeShowConversationList } from '../../actions/makeShowConversationList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MyConversationsButton', () => {
  let Connected: any = MyConversationsButton;
  let spyShowConversations: jest.Mock;
  let restoreShowConversations: () => void;

  beforeEach(() => {
    [spyShowConversations, restoreShowConversations] = makeShowConversationList.mock(jest.fn());
  });

  afterEach(() => {
    restoreShowConversations();
  });

  it('should provide showConversationList function to ShowContactsButton', async () => {
    const store = mockStore({});
    const component = shallow(<Connected store={store} />);
    (component.prop('showConversationList') as any)();
    expect(spyShowConversations).toHaveBeenCalledWith();
  });
});

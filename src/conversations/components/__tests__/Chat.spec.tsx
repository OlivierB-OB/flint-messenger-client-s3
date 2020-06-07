import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { Chat } from '../Chat';
import { makeConversationSeen } from '../../actions/makeConversationSeen';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Chat', () => {
  let Connected: any = Chat;
  let spyConversationSeen: jest.Mock;
  let restoreConversationSeen: () => void;

  beforeEach(() => {
    [spyConversationSeen, restoreConversationSeen] = makeConversationSeen.mock(jest.fn());
  });

  afterEach(() => {
    restoreConversationSeen();
  });

  it('should provide status, conversationId, conversation and callbacks to ChatDisplay', async () => {
    const store = mockStore({
      conversations: {
        status: 'conversation status',
        conversations: [{ _id: '123', fake: 'the conversation' }],
      },
    });
    const match: any = {
      params: {
        conversationId: '123',
      },
    };
    const component = shallow(<Connected store={store} match={match} />).dive();
    expect(component).toMatchSnapshot();

    (component.prop('conversationSeen') as any)(component.prop('conversationId'));
    expect(spyConversationSeen).toHaveBeenCalledWith('123');
  });

  it('should not crash if the match is not clean', async () => {
    const store = mockStore({
      conversations: {
        status: 'conversation status',
        conversations: [{ _id: '123', fake: 'the conversation' }],
      },
    });
    const match: any = {};
    const component = shallow(<Connected store={store} match={match} />).dive();
    expect(component).toMatchSnapshot();
  });

  it('should not crash if the conversation is not found', async () => {
    const store = mockStore({
      conversations: {
        status: 'conversation status',
        conversations: [{ _id: '123', fake: 'the conversation' }],
      },
    });
    const match: any = {
      params: {
        conversationId: '222',
      },
    };
    const component = shallow(<Connected store={store} match={match} />).dive();
    expect(component).toMatchSnapshot();
  });
});

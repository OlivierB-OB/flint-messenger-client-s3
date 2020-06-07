import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { ChatInput } from '../ChatInput';
import { makeSendMessage } from '../../actions/makeSendMessage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ChatInput', () => {
  let Connected: any = ChatInput;
  let spySend: jest.Mock;
  let restoreSend: () => void;

  beforeEach(() => {
    [spySend, restoreSend] = makeSendMessage.mock(jest.fn());
  });

  afterEach(() => {
    restoreSend();
  });

  it('should provide messageEdition, conversationId and callbacks to ChatInputDisplay', async () => {
    const store = mockStore({
      conversations: {
        messageEdition: 'the messageEdition',
      },
    });
    const component = shallow(<Connected store={store} conversationId={'the conversationId'} />).dive();
    expect(component).toMatchSnapshot();

    (component.prop('updateMessageEdition') as any)('new value');
    expect(store.getActions()).toEqual([
      {
        messageEdition: 'new value',
        type: 'UPDATE_MESSAGE_EDITION',
      },
    ]);
    store.clearActions();

    (component.prop('sendMessage') as any)(component.prop('conversationId'));
    expect(spySend).toHaveBeenCalledWith('the conversationId');
  });
});

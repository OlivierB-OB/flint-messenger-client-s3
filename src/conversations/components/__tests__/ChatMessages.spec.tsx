import React from 'react';
import { shallow, mount } from 'enzyme';
import { ChatMessages } from '../ChatMessages';

describe('ChatMessages', () => {
  it('should display a feedback if there is no messages in the conversation', async () => {
    const props: any = {
      conversationId: '123',
      messages: [],
      conversationSeen: jest.fn(),
    };
    const component = shallow(<ChatMessages {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should display the conversation messages', async () => {
    const props: any = {
      conversationId: '123',
      messages: [
        { _id: '123', content: 'message 1' },
        { _id: '456', content: 'message 2' },
      ],
      conversationSeen: jest.fn(),
    };
    const component = shallow(<ChatMessages {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call the callback conversationSeen on mount', async () => {
    const props: any = {
      conversationId: '123',
      messages: [],
      conversationSeen: jest.fn(),
    };
    mount(<ChatMessages {...props} />);
    expect(props.conversationSeen).toHaveBeenCalledWith('123');
  });

  it('should not call the callback conversationSeen if conversation if is unavailable', async () => {
    const props: any = {
      messages: [],
      conversationSeen: jest.fn(),
    };
    mount(<ChatMessages {...props} />);
    expect(props.conversationSeen).not.toHaveBeenCalled();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { ChatDisplay } from '../Chat';

describe('ChatDisplay', () => {
  it('should display the chat', async () => {
    const props: any = {
      status: 'conversation status',
      conversationId: 'conversation id',
      conversation: { messages: 'conversation messages' },
      conversationSeen: jest.fn(),
    };
    const component = shallow(<ChatDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should display a progress bar while sending', async () => {
    const props: any = {
      status: 'sending',
      conversationId: 'conversation id',
      conversation: { messages: 'conversation messages' },
      conversationSeen: jest.fn(),
    };
    const component = shallow(<ChatDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should return null if conversationId has not been provided', async () => {
    const props: any = {
      status: 'conversation status',
      conversation: { messages: 'conversation messages' },
      conversationSeen: jest.fn(),
    };
    const component = shallow(<ChatDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should return null if conversation has not been provided', async () => {
    const props: any = {
      status: 'conversation status',
      conversationId: 'conversation id',
      conversationSeen: jest.fn(),
    };
    const component = shallow(<ChatDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });
});

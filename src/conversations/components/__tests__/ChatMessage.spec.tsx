import React from 'react';
import { shallow } from 'enzyme';
import { ChatMessage } from '../ChatMessage';

describe('ChatMessage', () => {
  it('should display a message of a conversation', async () => {
    const message: any = {
      emitter: 'message emitter',
      content: 'message text',
      createdAt: 'message date',
    };
    const component = shallow(<ChatMessage message={message} />);
    expect(component).toMatchSnapshot();
  });
});

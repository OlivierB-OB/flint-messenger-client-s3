import React from 'react';
import { shallow } from 'enzyme';
import { ConversationListItem } from '../ConversationListItem';

describe('ConversationListItem', () => {
  it('should display a conversation as a list item', async () => {
    const props: any = {
      conversation: {
        unseenMessages: 'number of unseen messages',
        messages: [{ content: 'first message content' }, { content: 'last message content' }],
        targets: ['conversation target'],
        updatedAt: 'conversation update date',
      },
    };
    const component = shallow(<ConversationListItem {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should support the case of empty message list', async () => {
    const props: any = {
      conversation: {
        unseenMessages: 'number of unseen messages',
        messages: [],
        targets: ['conversation target'],
        updatedAt: 'conversation update date',
      },
    };
    const component = shallow(<ConversationListItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});

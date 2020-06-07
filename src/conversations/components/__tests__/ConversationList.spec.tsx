import React from 'react';
import { shallow } from 'enzyme';
import { ConversationList } from '../MyConversations';

describe('ConversationList', () => {
  it('should appear as loading if conversation service is unavailable', async () => {
    const props: any = {
      status: 'unavailable',
      list: [],
    };
    const component = shallow(
      <ConversationList {...props} />,
    ).dive();
    expect(component).toMatchSnapshot();
  });

  it('should display a message if no conversation', async () => {
    const props: any = {
      status: 'ready',
      list: [],
    };
    const component = shallow(
      <ConversationList {...props} />,
    ).dive();
    expect(component).toMatchSnapshot();
  });

  it('should display the conversations', async () => {
    const props: any = {
      status: 'unavailable',
      list: [
        { _id: '123' },
        { _id: '456' },
      ],
    };
    const component = shallow(
      <ConversationList {...props} />,
    ).dive();
    expect(component).toMatchSnapshot();
  });
});

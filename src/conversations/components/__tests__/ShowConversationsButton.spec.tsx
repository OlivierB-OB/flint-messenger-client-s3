import React from 'react';
import { shallow } from 'enzyme';
import { ShowConversationsButton } from '../MyConversationsButton';

describe('ShowConversationsButton', () => {
  it('should display a show conversation button...', async () => {
    const props: any = {
      unseenMessages: 'nb unseen messages',
      showConversationList: jest.fn(),
    }
    const component = shallow(<ShowConversationsButton {...props} />);
    expect(component).toMatchSnapshot();
    component.simulate('click');
    expect(props.showConversationList).toHaveBeenCalled();
  });
});

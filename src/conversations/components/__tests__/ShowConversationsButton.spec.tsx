import React from 'react';
import { shallow } from 'enzyme';
import { ShowConversationsButton } from '../MyConversationsButton';

describe('ShowConversationsButton', () => {
  it('should display a show conversation button...', async () => {
    const showConversationList = jest.fn();
    const component = shallow(<ShowConversationsButton showConversationList={showConversationList} />);
    expect(component).toMatchSnapshot();
    component.simulate('click');
    expect(showConversationList).toHaveBeenCalled();
  });
});

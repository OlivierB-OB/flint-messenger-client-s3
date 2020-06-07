import React from 'react';
import { shallow } from 'enzyme';
import { ShowContactsButton } from '../MyContactsButton';

describe('ShowContactsButton', () => {
  it('should display a show contact button...', async () => {
    const showContactList = jest.fn();
    const component = shallow(<ShowContactsButton showContactList={showContactList} />);
    expect(component).toMatchSnapshot();
    component.simulate('click');
    expect(showContactList).toHaveBeenCalled();
  });
});

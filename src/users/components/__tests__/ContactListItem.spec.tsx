import React from 'react';
import { shallow } from 'enzyme';
import { ContactListItem } from '../ContactListItem';

describe('ContactListItem', () => {
  it('should show the contact with avatar name and status', async () => {
    const info: any = {
      firstName: 'foo',
      lastName: 'bar',
      status: 'available',
    };
    const component = shallow(<ContactListItem info={info} />);
    expect(component).toMatchSnapshot();
  });
});

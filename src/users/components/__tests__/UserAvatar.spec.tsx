import React from 'react';
import { shallow } from 'enzyme';
import { UserAvatar } from '../UserAvatar';

describe('UserAvatar', () => {
  it('should display the user initial', async () => {
    const info: any = {
      firstName: 'foo',
      lastName: 'bar',
      status: 'offline',
    };
    const component = shallow(<UserAvatar info={info} />);
    expect(component).toMatchSnapshot();
  });

  it('should support undefined user information', async () => {
    const component = shallow(<UserAvatar info={undefined} />);
    expect(component).toMatchSnapshot();
  });
});

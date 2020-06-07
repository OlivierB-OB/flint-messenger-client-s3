import React from 'react';
import { shallow } from 'enzyme';
import { MyProfileLink } from '../MyProfileLink';

describe('MyProfileLink', () => {
  it('should provide a link toward the profile page', async () => {
    const component = shallow(<MyProfileLink />);
    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { UserName } from '../UserName';

describe('UserName', () => {
  it('should display the user name', async () => {
    const info: any = {
      firstName: 'foo',
      lastName: 'bar',
    };
    const component = shallow(<UserName info={info} />);
    expect(component).toMatchSnapshot();
  });

  it('should support undefined user information', async () => {
    const component = shallow(<UserName info={undefined} />);
    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { MyNameDisplay } from '../MyName';

describe('MyNameDisplay', () => {
  it('should return null if info is undefined', async () => {
    const props: any = {};
    const component = shallow(<MyNameDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should display the username given the provided info', async () => {
    const props: any = {
      info: 'the user information',
    };
    const component = shallow(<MyNameDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from '../AppMenu';

describe('Menu', () => {
  it('should display the application menu', async () => {
    const component = shallow(<Menu allowNavigation={true} />);
    expect(component).toMatchSnapshot();
  });

  it('should allow disabling the navigation', async () => {
    const component = shallow(<Menu allowNavigation={false} />);
    expect(component).toMatchSnapshot();
  });
});

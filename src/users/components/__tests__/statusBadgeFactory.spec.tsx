import React from 'react';
import { shallow } from 'enzyme';
import statusBadgeFactory from '../statusBadgeFactory';

describe('statusBadgeFactory', () => {
  it('available', async () => {
    const Badge = statusBadgeFactory('available');
    const component = shallow(<Badge />);
    expect(component).toMatchSnapshot();
  });

  it('incall', async () => {
    const Badge = statusBadgeFactory('incall');
    const component = shallow(<Badge />);
    expect(component).toMatchSnapshot();
  });

  it('offline', async () => {
    const Badge = statusBadgeFactory('offline');
    const component = shallow(<Badge />);
    expect(component).toMatchSnapshot();
  });
});

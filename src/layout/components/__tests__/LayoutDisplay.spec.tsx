import React from 'react';
import { shallow } from 'enzyme';
import { LayoutDisplay } from '../AppLayout';

describe('LayoutDisplay', () => {
  it('display without drawer', async () => {
    const component = shallow(<LayoutDisplay showDrawer={false} />);
    expect(component).toMatchSnapshot();
  });

  it('display with drawer', async () => {
    const component = shallow(<LayoutDisplay showDrawer={true} />);
    expect(component).toMatchSnapshot();
  });
});

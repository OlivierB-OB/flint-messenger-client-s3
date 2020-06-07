import React from 'react';
import { shallow } from 'enzyme';
import { Loading } from '../Loading';

describe('Loading', () => {
  it('should display a loader', async () => {
    const component = shallow(<Loading />);
    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { PrettyDate } from '../PrettyDate';

describe('PrettyDate', () => {
  it('should display the date', async () => {
    const component = shallow(<PrettyDate date="2020-06-07T11:53:32.000Z" />);
    expect(component).toMatchSnapshot();
  });
});

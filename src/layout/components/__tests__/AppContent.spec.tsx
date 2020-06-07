import React from 'react';
import { shallow } from 'enzyme';
import { AppContent } from '../AppContent';

describe('AppContent', () => {
  it('should take care of the routing', async () => {
    const component = shallow(<AppContent />);
    expect(component).toMatchSnapshot();
  });
});

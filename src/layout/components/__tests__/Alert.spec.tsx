import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from '../Alert';

describe('Alert', () => {
  it('should display nothing if status is neither success, nor error', async () => {
    const component = shallow(<Alert status="anything" success="ok" />);
    expect(component).toMatchSnapshot();
  });

  it('should display a success message if status is success', async () => {
    const component = shallow(<Alert status="success" success="ok" error="ko" />);
    expect(component).toMatchSnapshot();
  });

  it('should display an error message if status is error', async () => {
    const component = shallow(<Alert status="error" success="ok" error="ko" />);
    expect(component).toMatchSnapshot();
  });

  it('should display nothing if status is success but no success message have been provided', async () => {
    const component = shallow(<Alert status="success" />);
    expect(component).toMatchSnapshot();
  });

  it('should display a default error message if status is error but no error message have been provided', async () => {
    const component = shallow(<Alert status="error" />);
    expect(component).toMatchSnapshot();
  });
});

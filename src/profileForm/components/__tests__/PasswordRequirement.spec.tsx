import React from 'react';
import { shallow } from 'enzyme';
import { PasswordRequirement } from '../PasswordRequirement';

describe('PasswordRequirement', () => {
  it('should display requirement', async () => {
    const component = shallow(<PasswordRequirement check={true} message="description" />);
    expect(component).toMatchSnapshot();
  });

  it('should not be checked if check is false', async () => {
    const component = shallow(<PasswordRequirement check={false} message="description" />);
    expect(component).toMatchSnapshot();
  });
});

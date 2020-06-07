import React from 'react';
import { shallow } from 'enzyme';
import { PasswordRequirements } from '../PasswordRequirements';

describe('PasswordRequirement', () => {
  it('should display all password requirements with their states', async () => {
    const password: any = {
      hasLower: 'hasLower value',
      hasUpper: 'hasUpper value',
      hasNumber: 'hasNumber value',
      hasSymbol: 'hasSymbol value',
      hasValidLength: 'hasValidLength value',
    };
    const component = shallow(<PasswordRequirements password={password} />);
    expect(component).toMatchSnapshot();
  });
});

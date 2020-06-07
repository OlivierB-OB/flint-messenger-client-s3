import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { RegistrationFormDisplay } from '../RegistrationForm';

describe('RegistrationFormDisplay', () => {
  it('should display the profile form', async () => {
    const props: any = {
      status: 'the status',
      fields: {
        email: 'email field',
        firstName: 'firstName field',
        lastName: 'lastName field',
        password: 'password field',
        confirmation: 'confirmation field',
      },
      update: 'update',
      saveProfile: 'saveProfile',
    };
    const component = shallow(<RegistrationFormDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should allow saving', async () => {
    const props: any = {
      status: 'ready',
      fields: {},
      saveProfile: jest.fn(),
    };
    const component = shallow(<RegistrationFormDisplay {...props} />);
    expect(component.find(Button).at(0).prop('type')).toEqual('submit');
    component.find('form').simulate('submit');
    expect(props.saveProfile).toHaveBeenCalled();
  });
});

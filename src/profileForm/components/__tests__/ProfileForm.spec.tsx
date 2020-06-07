import React from 'react';
import { shallow, mount } from 'enzyme';
import { ProfileForm } from '../MyProfile';
import Button from '@material-ui/core/Button';

describe('ProfileForm', () => {
  it('should appear as loading if service is unavailable (1)', async () => {
    const props: any = {
      identityStatus: 'unavailable',
      formStatus: 'ready',
      fields: {},
    };
    const component = shallow(<ProfileForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should appear as loading if service is unavailable (2)', async () => {
    const props: any = {
      identityStatus: 'ready',
      formStatus: 'unavailable',
      fields: {},
    };
    const component = shallow(<ProfileForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should display the profile form', async () => {
    const props: any = {
      identityStatus: 'ready',
      formStatus: 'the status',
      fields: {
        email: 'email field',
        firstName: 'firstName field',
        lastName: 'lastName field',
        password: 'password field',
        confirmation: 'confirmation field',
      },
      update: 'update',
      resetProfile: 'resetProfile',
      saveProfile: 'saveProfile',
      deleteProfile: 'deleteProfile',
    };
    const component = shallow(<ProfileForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should allow deleting', async () => {
    const props: any = {
      identityStatus: 'ready',
      formStatus: 'the status',
      fields: {},
      deleteProfile: jest.fn(),
    };
    const component = shallow(<ProfileForm {...props} />);
    component.find(Button).at(0).simulate('click');
    expect(props.deleteProfile).toHaveBeenCalled();
  });

  it('should allow resetting', async () => {
    const props: any = {
      identityStatus: 'ready',
      formStatus: 'ready',
      fields: {},
      resetProfile: jest.fn(),
    };
    const component = shallow(<ProfileForm {...props} />);
    component.find(Button).at(1).simulate('click');
    expect(props.resetProfile).toHaveBeenCalled();
  });

  it('should allow saving', async () => {
    const props: any = {
      identityStatus: 'ready',
      formStatus: 'ready',
      fields: {},
      saveProfile: jest.fn(),
    };
    const component = shallow(<ProfileForm {...props} />);
    expect(component.find(Button).at(2).prop('type')).toEqual('submit');
    component.find('form').simulate('submit');
    expect(props.saveProfile).toHaveBeenCalled();
  });

  it('should reset the form on mount', async () => {
    const props: any = {
      identityStatus: 'ready',
      formStatus: 'ready',
      fields: {
        email: {
          value: '',
          isValid: true,
        },
        firstName: {
          value: '',
          isValid: true,
        },
        lastName: {
          value: '',
          isValid: true,
        },
        password: {
          value: '',
          isValid: true,
        },
        confirmation: {
          value: '',
          isValid: true,
        },
      },
      update: jest.fn(),
      deleteProfile: jest.fn(),
      resetProfile: jest.fn(),
      saveProfile: jest.fn(),
    };
    mount(<ProfileForm {...props} />);
    expect(props.resetProfile).toHaveBeenCalled();
  });
});

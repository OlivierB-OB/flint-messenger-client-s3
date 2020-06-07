import TextField from '@material-ui/core/TextField';
import React from 'react';
import { shallow } from 'enzyme';
import { CredentialsSection } from '../CredentialsSection';

describe('CredentialsSection', () => {
  it('should display the password and confiramtion value', async () => {
    const data: any = {
      password: {
        value: 'password value',
        isValid: true,
      },
      confirmation: {
        value: 'confirmation value',
        isValid: true,
      },
    };
    const component = shallow(<CredentialsSection {...data} />);
    expect(component).toMatchSnapshot();
  });

  it('should show error if any', async () => {
    const data: any = {
      password: {
        value: 'password value',
        isValid: false,
        error: 'password error',
      },
      confirmation: {
        value: 'confirmation value',
        isValid: false,
        error: 'confirmation error',
      },
    };
    const component = shallow(<CredentialsSection {...data} />);
    expect(component).toMatchSnapshot();
  });

  it('should display the confiramtion as optional if the password field is empty', async () => {
    const data: any = {
      password: {
        value: '',
        isValid: true,
      },
      confirmation: {
        value: '',
        isValid: true,
      },
    };
    const component = shallow(<CredentialsSection {...data} />);
    expect(component).toMatchSnapshot();
  });

  it('should allow editing the password value', async () => {
    const data: any = {
      password: {
        value: 'password value',
        isValid: true,
      },
      confirmation: {
        value: 'confirmation value',
        isValid: true,
      },
      update: jest.fn(),
    };
    const component = shallow(<CredentialsSection {...data} />);
    component
      .find(TextField)
      .at(0)
      .simulate('change', { target: { value: 'new value' } });
    expect(data.update).toHaveBeenCalledWith('password', 'new value');
  });

  it('should allow editing the confirmation value', async () => {
    const data: any = {
      password: {
        value: 'password value',
        isValid: true,
      },
      confirmation: {
        value: 'confirmation value',
        isValid: true,
      },
      update: jest.fn(),
    };
    const component = shallow(<CredentialsSection {...data} />);
    component
      .find(TextField)
      .at(1)
      .simulate('change', { target: { value: 'new value' } });
    expect(data.update).toHaveBeenCalledWith('confirmation', 'new value');
  });
});

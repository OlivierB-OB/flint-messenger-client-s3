import TextField from '@material-ui/core/TextField';
import React from 'react';
import { shallow } from 'enzyme';
import { IdentitySection } from '../IdentitySection';

describe('IdentitySection', () => {
  it('should display the email firstName and lastName value (email FYI only)', async () => {
    const data: any = {
      email: {
        value: 'email value',
        isValid: true,
      },
      firstName: {
        value: 'firstName value',
        isValid: true,
      },
      lastName: {
        value: 'lastName value',
        isValid: true,
      },
    };
    const component = shallow(<IdentitySection {...data} />);
    expect(component).toMatchSnapshot();
  });

  it('should display the email firstName and lastName value (email editable)', async () => {
    const data: any = {
      allowEmailEdition: true,
      email: {
        value: 'email value',
        isValid: true,
      },
      firstName: {
        value: 'firstName value',
        isValid: true,
      },
      lastName: {
        value: 'lastName value',
        isValid: true,
      },
    };
    const component = shallow(<IdentitySection {...data} />);
    expect(component).toMatchSnapshot();
  });

  it('should show error if any', async () => {
    const data: any = {
      allowEmailEdition: true,
      email: {
        value: 'email value',
        isValid: false,
        error: 'email error',
      },
      firstName: {
        value: 'firstName value',
        isValid: false,
        error: 'firstName error',
      },
      lastName: {
        value: 'lastName value',
        isValid: false,
        error: 'lastName error',
      },
    };
    const component = shallow(<IdentitySection {...data} />);
    expect(component).toMatchSnapshot();
  });

  it('should allow editing the email value', async () => {
    const data: any = {
      allowEmailEdition: true,
      email: {
        value: 'email value',
        isValid: true,
      },
      firstName: {
        value: 'firstName value',
        isValid: true,
      },
      lastName: {
        value: 'lastName value',
        isValid: true,
      },
      update: jest.fn(),
    };
    const component = shallow(<IdentitySection {...data} />);
    component
      .find(TextField)
      .at(0)
      .simulate('change', { target: { value: 'new value' } });
    expect(data.update).toHaveBeenCalledWith('email', 'new value');
  });

  it('should allow editing the firstName value', async () => {
    const data: any = {
      allowEmailEdition: true,
      email: {
        value: 'email value',
        isValid: true,
      },
      firstName: {
        value: 'firstName value',
        isValid: true,
      },
      lastName: {
        value: 'lastName value',
        isValid: true,
      },
      update: jest.fn(),
    };
    const component = shallow(<IdentitySection {...data} />);
    component
      .find(TextField)
      .at(1)
      .simulate('change', { target: { value: 'new value' } });
    expect(data.update).toHaveBeenCalledWith('firstName', 'new value');
  });

  it('should allow editing the lastName value', async () => {
    const data: any = {
      allowEmailEdition: true,
      email: {
        value: 'email value',
        isValid: true,
      },
      firstName: {
        value: 'firstName value',
        isValid: true,
      },
      lastName: {
        value: 'lastName value',
        isValid: true,
      },
      update: jest.fn(),
    };
    const component = shallow(<IdentitySection {...data} />);
    component
      .find(TextField)
      .at(2)
      .simulate('change', { target: { value: 'new value' } });
    expect(data.update).toHaveBeenCalledWith('lastName', 'new value');
  });
});

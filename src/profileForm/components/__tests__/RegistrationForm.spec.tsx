import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { RegistrationForm } from '../RegistrationForm';
import { makeSubmitRegistrationForm } from '../../actions/makeSubmitRegistrationForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('RegistrationForm', () => {
  let Connected: any = RegistrationForm;
  let spySubmit: jest.Mock;
  let restoreSubmit: () => void;

  beforeEach(() => {
    [spySubmit, restoreSubmit] = makeSubmitRegistrationForm.mock(jest.fn());
  });

  afterEach(() => {
    restoreSubmit();
  });

  it('should provide status, fields and callbacks to RegistrationFormDisplay', async () => {
    const store = mockStore({
      profileForm: {
        status: 'profileForm status',
        fields: 'profileForm fields',
      },
    });
    const component = shallow(<Connected store={store} />).dive();
    expect(component).toMatchSnapshot();

    (component.prop('update') as any)('field to update', 'new value');
    expect(store.getActions()).toEqual([
      {
        field: 'field to update',
        value: 'new value',
        type: 'UPDATE_PROFILE_FORM',
      },
    ]);
    store.clearActions();

    (component.prop('saveProfile') as any)();
    expect(spySubmit).toHaveBeenCalled();
  });
});

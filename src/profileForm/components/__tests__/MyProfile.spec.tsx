import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { MyProfile } from '../MyProfile';
import { makeResetProfileForm } from '../../actions/makeResetProfileForm';
import { makeSaveProfileForm } from '../../actions/makeSaveProfileForm';
import { makeDeleteProfile } from '../../actions/makeDeleteProfile';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MyProfile', () => {
  let Connected: any = MyProfile;
  let spyReset: jest.Mock;
  let restoreReset: () => void;
  let spySave: jest.Mock;
  let restoreSave: () => void;
  let spyDelete: jest.Mock;
  let restoreDelete: () => void;

  beforeEach(() => {
    [spyReset, restoreReset] = makeResetProfileForm.mock(jest.fn());
    [spySave, restoreSave] = makeSaveProfileForm.mock(jest.fn());
    [spyDelete, restoreDelete] = makeDeleteProfile.mock(jest.fn());
  });

  afterEach(() => {
    restoreReset();
    restoreSave();
    restoreDelete();
  });

  it('should provide status, fields and callbacks to ProfileForm', async () => {
    const store = mockStore({
      identity: {
        status: 'identity status',
      },
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

    (component.prop('resetProfile') as any)();
    expect(spyReset).toHaveBeenCalled();

    (component.prop('saveProfile') as any)();
    expect(spySave).toHaveBeenCalled();

    (component.prop('deleteProfile') as any)();
    expect(spyDelete).toHaveBeenCalled();
  });
});

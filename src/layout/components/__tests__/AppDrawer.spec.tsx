import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { AppDrawer } from '../AppDrawer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AppDrawer', () => {
  let Connected: any = AppDrawer;

  it('should provide show content, and a closing callback to DrawerDisplay', async () => {
    const store = mockStore({
      layout: {
        show: 'show from state',
        content: 'content from state',
      },
    });
    const component = shallow(<Connected store={store} />).dive();
    expect(component).toMatchSnapshot();
    (component.prop('hideDrawer') as any)();
    expect(store.getActions()).toEqual([
      {
        showDrawer: false,
        type: 'TOGGLE_DRAWER',
      },
    ]);
    store.clearActions();
  });
});

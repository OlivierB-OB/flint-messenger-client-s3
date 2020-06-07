import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { AppLayout } from '../AppLayout';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AppLayout', () => {
  let Connected: any = AppLayout;

  it('should provide showDrawer to LayoutDisplay', async () => {
    const store = mockStore({
      layout: {
        showDrawer: 'showDrawer from state',
      },
    });
    const component = shallow(<Connected store={store} />).dive();
    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { AppMenu } from '../AppMenu';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AppMenu', () => {
  let Connected: any = AppMenu;

  it('should provide allowNavigation to Menu', async () => {
    const store = mockStore({
      layout: {
        allowNavigation: 'allowNavigation from state',
      },
    });
    const component = shallow(<Connected store={store} />).dive();
    expect(component).toMatchSnapshot();
  });
});

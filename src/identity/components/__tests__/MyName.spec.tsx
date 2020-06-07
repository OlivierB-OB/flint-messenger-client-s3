import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { MyName } from '../MyName';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MyName', () => {
  let Connected: any = MyName;

  it('should provide user info to MyNameDisplay', async () => {
    const store = mockStore({
      identity: {
        info: 'the user information',
      },
    });
    const component = shallow(<Connected store={store} />).dive();
    expect(component).toMatchSnapshot();
  });
});

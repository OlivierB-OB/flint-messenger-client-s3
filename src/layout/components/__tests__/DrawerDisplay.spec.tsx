import React from 'react';
import { shallow } from 'enzyme';
import { DrawerDisplay } from '../AppDrawer';
import IconButton from '@material-ui/core/IconButton';

describe('DrawerDisplay', () => {
  it('drawer shown - no content', async () => {
    const props: any = {
      show: true,
      hideDrawer: 'hideDrawer',
    };
    const component = shallow(<DrawerDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('drawer shown - contacts', async () => {
    const props: any = {
      show: true,
      content: 'contacts',
      hideDrawer: 'hideDrawer',
    };
    const component = shallow(<DrawerDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('drawer shown - conversations', async () => {
    const props: any = {
      show: true,
      content: 'conversations',
      hideDrawer: 'hideDrawer',
    };
    const component = shallow(<DrawerDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('drawer not shown', async () => {
    const props: any = {
      show: false,
      hideDrawer: 'hideDrawer',
    };
    const component = shallow(<DrawerDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should allow closing the drawer', async () => {
    const props: any = {
      show: false,
      hideDrawer: jest.fn(),
    };
    const component = shallow(<DrawerDisplay {...props} />);
    component.find(IconButton).simulate('click');
    expect(props.hideDrawer).toHaveBeenCalled();
  });
});

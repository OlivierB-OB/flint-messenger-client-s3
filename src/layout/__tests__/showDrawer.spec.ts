import { layout } from '../reducer';
import { showDrawer } from '../actions/showDrawer';

describe('showDrawer', () => {
  it('should allow showing the drawer', async () => {
    expect(
      layout(
        {
          showDrawer: false,
          allowNavigation: false,
          drawerContent: 'contacts',
        },
        showDrawer(),
      ),
    ).toEqual({
      showDrawer: true,
      allowNavigation: false,
      drawerContent: 'contacts',
    });
  });

  it('should not allow showing the drawer if no content specified', async () => {
    expect(
      layout(
        {
          showDrawer: false,
          allowNavigation: false,
        },
        showDrawer(),
      ),
    ).toEqual({
      showDrawer: false,
      allowNavigation: false,
    });
  });
});

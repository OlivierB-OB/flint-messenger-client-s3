import { layout } from '../reducer';
import { showDrawer } from '../actions/showDrawer';
import { defaultLayoutState } from '../utils';

describe('showDrawer', () => {
  it('should allow showing the drawer', async () => {
    expect(
      layout(
        {
          ...defaultLayoutState(),
          drawerContent: 'contacts',
        },
        showDrawer(),
      ),
    ).toEqual({
      ...defaultLayoutState(),
      showDrawer: true,
      drawerContent: 'contacts',
    });
  });

  it('should not allow showing the drawer if no content specified', async () => {
    expect(layout(defaultLayoutState(), showDrawer())).toEqual(defaultLayoutState());
  });
});

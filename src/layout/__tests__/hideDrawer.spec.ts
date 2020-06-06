import { layout } from '../reducer';
import { hideDrawer } from '../actions/hideDrawer';

describe('hideDrawer', () => {
  it('should allow hidding the drawer', async () => {
    expect(
      layout(
        {
          showDrawer: true,
          allowNavigation: false,
        },
        hideDrawer(),
      ),
    ).toEqual({
      showDrawer: false,
      allowNavigation: false,
    });
  });
});

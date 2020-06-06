import { layout } from '../reducer';
import { hideDrawer } from '../actions/hideDrawer';
import { defaultLayoutState } from '../utils';

describe('hideDrawer', () => {
  it('should allow hidding the drawer', async () => {
    expect(
      layout(
        {
          ...defaultLayoutState(),
          showDrawer: true,
        },
        hideDrawer(),
      ),
    ).toEqual({
      ...defaultLayoutState(),
      showDrawer: false,
    });
  });
});

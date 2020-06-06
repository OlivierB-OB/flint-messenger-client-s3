import { layout } from '../reducer';
import { hideNavigation } from '../actions/hideNavigation';

describe('hideNavigation', () => {
  it('should allow hidding the navigation', async () => {
    expect(
      layout(
        {
          showDrawer: false,
          allowNavigation: true,
        },
        hideNavigation(),
      ),
    ).toEqual({
      showDrawer: false,
      allowNavigation: false,
    });
  });
});

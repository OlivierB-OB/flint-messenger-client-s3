import { layout } from '../reducer';
import { showNavigation } from '../actions/showNavigation';

describe('showNavigation', () => {
  it('should allow showing the navigation', async () => {
    expect(
      layout(
        {
          showDrawer: false,
          allowNavigation: false,
        },
        showNavigation(),
      ),
    ).toEqual({
      showDrawer: false,
      allowNavigation: true,
    });
  });
});

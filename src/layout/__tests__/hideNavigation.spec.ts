import { layout } from '../reducer';
import { hideNavigation } from '../actions/hideNavigation';
import { defaultLayoutState } from '../utils';

describe('hideNavigation', () => {
  it('should allow hidding the navigation', async () => {
    expect(
      layout(
        {
          ...defaultLayoutState(),
          allowNavigation: true,
        },
        hideNavigation(),
      ),
    ).toEqual({
      ...defaultLayoutState(),
      allowNavigation: false,
    });
  });
});

import { layout } from '../reducer';
import { showNavigation } from '../actions/showNavigation';
import { defaultLayoutState } from '../utils';

describe('showNavigation', () => {
  it('should allow showing the navigation', async () => {
    expect(layout(defaultLayoutState(), showNavigation())).toEqual({
      ...defaultLayoutState(),
      allowNavigation: true,
    });
  });
});

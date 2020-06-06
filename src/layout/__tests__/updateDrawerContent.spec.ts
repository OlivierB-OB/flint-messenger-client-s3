import { layout } from '../reducer';
import { updateDrawerContent } from '../actions/updateDrawerContent';
import { defaultLayoutState } from '../utils';

describe('updateDrawerContent', () => {
  it('should allow updating the drawer content', async () => {
    expect(
      layout(
        {
          ...defaultLayoutState(),
          showDrawer: true,
          drawerContent: 'conversations',
        },
        updateDrawerContent('contacts'),
      ),
    ).toEqual({
      ...defaultLayoutState(),
      showDrawer: true,
      drawerContent: 'contacts',
    });
  });

  it('should close the drawer if no content provided', async () => {
    expect(
      layout(
        {
          ...defaultLayoutState(),
          showDrawer: true,
          drawerContent: 'conversations',
        },
        updateDrawerContent(),
      ),
    ).toEqual({
      ...defaultLayoutState(),
      showDrawer: false,
    });
  });
});

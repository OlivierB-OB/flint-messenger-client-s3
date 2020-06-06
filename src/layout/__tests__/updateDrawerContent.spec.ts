import { layout } from '../reducer';
import { updateDrawerContent } from '../actions/updateDrawerContent';

describe('updateDrawerContent', () => {
  it('should allow updating the drawer content', async () => {
    expect(
      layout(
        {
          showDrawer: true,
          allowNavigation: false,
          drawerContent: 'conversations',
        },
        updateDrawerContent('contacts'),
      ),
    ).toEqual({
      showDrawer: true,
      allowNavigation: false,
      drawerContent: 'contacts',
    });
  });

  it('should close the drawer if no content provided', async () => {
    expect(
      layout(
        {
          showDrawer: true,
          allowNavigation: false,
          drawerContent: 'conversations',
        },
        updateDrawerContent(),
      ),
    ).toEqual({
      showDrawer: false,
      allowNavigation: false,
    });
  });
});

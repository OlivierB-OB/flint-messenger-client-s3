import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Forum from '@material-ui/icons/Forum';
import React, { Fragment } from 'react';
import { MyConversations } from '../../conversations/components/MyConverstions';
import { MyConversationsButton } from '../../conversations/components/MyConversationsButton';
import { MyName } from '../../identity/components/MyName';
import { MyProfileLink } from '../../profileForm/components/MyProfileLink';
import { MyContacts } from '../../users/components/MyContacts';
import { MyContactsButton } from '../../users/components/MyContactsButton';

export function AppMenu() {
  return (
    <Fragment>
      <AppBar position="static" style={{ height: '10vh' }}>
        <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
          <Grid item>
            <Toolbar>
              <Forum fontSize="large" />
              <Typography variant="h3">flint.</Typography>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
              <MyName />
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
              <MyConversationsButton />
              <MyContactsButton />
              <MyProfileLink />
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
      <MyContacts />
      <MyConversations />
    </Fragment>
  );
}

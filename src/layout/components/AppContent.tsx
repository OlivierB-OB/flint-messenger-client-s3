import Box from '@material-ui/core/Box';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginScreen } from '../../login/components/LoginScreen';
import { Chat } from '../../conversations/components/Chat';
import { MyProfile } from '../../profileForm/components/MyProfile';
import { Call } from '../../call/components/Call';

export function AppContent() {
  return (
    <Box style={{ height: '90vh' }}>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route path="/profile" component={MyProfile} />
        <Route path="/conversation/:conversationId" component={Chat} />
        <Route path="/call" component={Call} />
      </Switch>
    </Box>
  );
}

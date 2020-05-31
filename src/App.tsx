import 'typeface-roboto';
import Box from '@material-ui/core/Box';
import { blue, blueGrey, red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppMenu } from './layout/components/AppMenu';
import { AppContent } from './layout/components/AppContent';
import { history } from './history';
import { store } from './store';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blueGrey,
    error: red,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box>
            <AppMenu />
            <AppContent />
          </Box>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

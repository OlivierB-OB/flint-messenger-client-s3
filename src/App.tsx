import 'typeface-roboto';
import Box from '@material-ui/core/Box';
import { blue, blueGrey, red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { history } from './history';
import { store } from './store';
import { AppLayout } from './layout/components/AppLayout';

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
            <AppLayout />
          </Box>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

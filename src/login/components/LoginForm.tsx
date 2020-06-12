import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { ILoginForm, ILoginStatus } from '../types';
import { loginUpdateForm } from '../actions/loginUpdateForm';
import { makeSubmitLogin } from '../actions/makeSubmitLogin';
import { Alert } from '../../layout/components/Alert';
import { IFormField } from '../../profileForm/types';

interface ILoginFormDisplayProps {
  status: ILoginStatus;
  email: IFormField<string>;
  password: IFormField<string>;
  update<T extends keyof ILoginForm>(field: T, value: string): void;
  submit(): void;
}

export function LoginFormDisplay({ status, email, password, update, submit }: ILoginFormDisplayProps) {
  return (
    <Container maxWidth="xs">
      <Box style={{ margin: '2rem 0' }}>
        <Alert status={status} />
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Box style={{ margin: '2rem 0' }}>
          <TextField
            label="Email"
            value={email.value}
            required={true}
            fullWidth={true}
            onChange={(event) => update('email', event.target.value)}
            {...(!email.isValid ? { error: true, helperText: email.error } : {})}
          />
          <TextField
            type="password"
            label="Password"
            value={password.value}
            required={true}
            fullWidth={true}
            onChange={(event) => update('password', event.target.value)}
            {...(!password.isValid ? { error: true, helperText: password.error } : {})}
          />
        </Box>
        <Box style={{ margin: '2rem 0' }}>
          <Grid container justify="flex-end">
            <Grid item xs={4}>
              <Button color="primary" variant="contained" fullWidth={true} type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}

const mapStateToProps = ({ login }: IAppState) => ({
  status: login.status,
  ...login.form,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  update: <T extends keyof ILoginForm>(field: T, value: string) => dispatch(loginUpdateForm(field, value)),
  submit: () => dispatch(makeSubmitLogin()),
});

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormDisplay);

import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { RegistrationForm } from '../../profileForm/components/RegistrationForm';
import { IProfileFormStatus } from '../../profileForm/types';
import { Loading } from '../../layout/components/Loading';
import { IAppState } from '../../appReducer';
import { ILoginStatus } from '../types';
import { LoginTabPanel } from './LoginTabPanel';
import { LoginForm } from './LoginForm';
import { resetProfileFormContent } from '../../profileForm/actions/resetProfileFormContent';
import { makeExitApplication } from '../../layout/actions/makeExitApplication';
import { ThunkDispatch } from 'redux-thunk';

export interface ILoginScreenDisplayProps {
  loginStatus: ILoginStatus;
  registrationStatus: IProfileFormStatus;
  resetRegistrationForm(): void;
}

export function LoginScreenDisplay({
  loginStatus,
  registrationStatus,
  resetRegistrationForm,
}: ILoginScreenDisplayProps) {
  const [tab, setTab] = useState(0);
  useEffect(() => void resetRegistrationForm(), [resetRegistrationForm]);
  if ([loginStatus, registrationStatus].includes('unavailable')) return <Loading />;
  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Tabs
        value={tab}
        onChange={(_, newTab) => setTab(newTab)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      <LoginTabPanel value={tab} index={0}>
        <LoginForm />
      </LoginTabPanel>
      <LoginTabPanel value={tab} index={1}>
        <RegistrationForm />
      </LoginTabPanel>
    </Container>
  );
}

const mapStateToProps = ({ login, profileForm }: IAppState) => ({
  loginStatus: login.status,
  registrationStatus: profileForm.status,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  exitApplication: () => dispatch(makeExitApplication()),
  resetRegistrationForm: () => dispatch(resetProfileFormContent()),
});

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginScreenDisplay);

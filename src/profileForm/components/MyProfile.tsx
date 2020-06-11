import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeResetProfileForm } from '../actions/makeResetProfileForm';
import { makeSaveProfileForm } from '../actions/makeSaveProfileForm';
import { updateProfileForm } from '../actions/updateProfileForm';
import { IProfileFormFields, IProfileFormStatus } from '../types';
import { IdentitySection } from './IdentitySection';
import { CredentialsSection } from './CredentialsSection';
import { IIdentityStatus, IProfile } from '../../identity/types';
import { Loading } from '../../layout/components/Loading';
import { Alert } from '../../layout/components/Alert';
import { makeDeleteProfile } from '../actions/makeDeleteProfile';
import { makeLogout } from '../actions/makeLogout';

export interface IProfileFormProps {
  identityStatus: IIdentityStatus;
  info?: IProfile,
  formStatus: IProfileFormStatus;
  optionalPassword?: boolean;
  fields: IProfileFormFields;
  update<T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']): void;
  saveProfile(): void;
  resetProfile(): void;
  logout(): void;
  deleteProfile(): void;
}

// FIXME allow to provide a profile picture from here

export function ProfileForm({
  identityStatus,
  info,
  formStatus,
  optionalPassword,
  fields,
  update,
  resetProfile,
  saveProfile,
  logout,
  deleteProfile,
}: IProfileFormProps) {
  const { email, firstName, lastName, password, confirmation } = fields;
  useEffect(() => void resetProfile(), [identityStatus, info, resetProfile]);
  if ([identityStatus, formStatus].includes('unavailable')) return <Loading />;
  return (
    <Container>
      <Box style={{ margin: '2rem 0' }}>
        <Alert status={formStatus} success="Profile successfully updated!" />
      </Box>
      <Box style={{ margin: '2rem 0' }}>
        <Grid container justify="flex-end">
          <Grid item xs={2}>
            <Button variant="contained" color="secondary" fullWidth={true} onClick={logout}>
              Logout
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="secondary" fullWidth={true} onClick={deleteProfile}>
              Delete account
            </Button>
          </Grid>
        </Grid>
      </Box>
      <form onSubmit={(e) => { e.preventDefault(); saveProfile()}}>
        <Box style={{ margin: '2rem 0' }}>
          <Grid container justify="space-evenly" alignItems="flex-start">
            <Grid item xs={4}>
              <IdentitySection
                allowEmailEdition={false}
                email={email}
                firstName={firstName}
                lastName={lastName}
                update={update}
              />
            </Grid>
            <Grid item xs={4}>
              <CredentialsSection
                password={password}
                confirmation={confirmation}
                optionalPassword={optionalPassword}
                update={update}
              />
            </Grid>
          </Grid>
        </Box>
        <Box style={{ margin: '2rem 0' }}>
          <Grid container justify="space-between">
            <Grid item xs={2}>
              <Button variant="contained" fullWidth={true} onClick={resetProfile}>
                Reset
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" fullWidth={true} type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}

const mapStateToProps = ({ identity, profileForm }: IAppState) => ({
  identityStatus: identity.status,
  info: identity.info,
  formStatus: profileForm.status,
  optionalPassword: profileForm.optionalPassword,
  fields: profileForm.fields,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  update: <T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']) =>
    dispatch(updateProfileForm(field, value)),
  resetProfile: () => dispatch(makeResetProfileForm()),
  saveProfile: () => dispatch(makeSaveProfileForm()),
  logout: () => dispatch(makeLogout()),
  deleteProfile: () => dispatch(makeDeleteProfile()),
});

export const MyProfile = connect(mapStateToProps, mapDispatchToProps)(ProfileForm);

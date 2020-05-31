import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateProfileForm } from '../actions/updateProfileForm';
import { IProfileFormFields, IProfileFormStatus } from '../types';
import { IdentitySection } from './IdentitySection';
import { CredentialsSection } from './CredentialsSection';
import { Alert } from '../../layout/components/Alert';
import { makeResetRegistrationForm } from '../actions/makeResetRegistrationForm';
import { makeSubmitRegistrationForm } from '../actions/makeSubmitRegistrationForm';

export interface IRegistrationDisplayFormProps {
  status: IProfileFormStatus;
  fields: IProfileFormFields;
  update<T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']): void;
  saveProfile(): void;
}

export function RegistrationFormDisplay({ status, fields, update, saveProfile }: IRegistrationDisplayFormProps) {
  const { email, firstName, lastName, password, confirmation } = fields;
  return (
    <Container>
      <Box style={{ margin: '2rem 0' }}>
        <Alert status={status} />
      </Box>
      <Box style={{ margin: '2rem 0' }}>
        <Grid container justify="space-evenly" alignItems="flex-start">
          <Grid item xs={4}>
            <IdentitySection
              allowEmailEdition={true}
              email={email}
              firstName={firstName}
              lastName={lastName}
              update={update}
            />
          </Grid>
          <Grid item xs={4}>
            <CredentialsSection password={password} confirmation={confirmation} update={update} />
          </Grid>
        </Grid>
      </Box>
      <Box style={{ margin: '2rem 0' }}>
        <Grid container justify="flex-end">
          <Grid item xs={2}>
            <Button variant="contained" color="primary" fullWidth={true} onClick={saveProfile}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const mapStateToProps = ({ profileForm }: IAppState) => ({
  status: profileForm.status,
  fields: profileForm.fields,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  update: <T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']) =>
    dispatch(updateProfileForm(field, value)),
  resetForm: () => dispatch(makeResetRegistrationForm()),
  saveProfile: () => dispatch(makeSubmitRegistrationForm()),
});

export const RegistrationForm = connect(mapStateToProps, mapDispatchToProps)(RegistrationFormDisplay);

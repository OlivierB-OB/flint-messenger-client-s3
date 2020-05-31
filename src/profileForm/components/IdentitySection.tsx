import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { IFormField, IProfileFormFields } from '../types';

export interface IIdentitySectionProps {
  allowEmailEdition: boolean;
  email: IFormField<string>;
  firstName: IFormField<string>;
  lastName: IFormField<string>;
  update<T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']): void;
}

export function IdentitySection({ allowEmailEdition, email, firstName, lastName, update }: IIdentitySectionProps) {
  return (
    <FormControl component="fieldset" fullWidth={true}>
      <FormLabel component="legend" style={{ margin: '1rem 0' }}>
        Your identity:
      </FormLabel>
      <FormGroup>
        <TextField
          label="Email"
          value={email.value}
          required={true}
          disabled={!allowEmailEdition}
          fullWidth={true}
          onChange={(event) => update('email', event.target.value)}
          {...(!email.isValid ? { error: true, helperText: email.error } : {})}
        />
        <TextField
          label="First name"
          value={firstName.value}
          required={true}
          fullWidth={true}
          onChange={(event) => update('firstName', event.target.value)}
          {...(!firstName.isValid ? { error: true, helperText: firstName.error } : {})}
        />
        <TextField
          label="Last name"
          value={lastName.value}
          required={true}
          fullWidth={true}
          onChange={(event) => update('lastName', event.target.value)}
          {...(!lastName.isValid ? { error: true, helperText: lastName.error } : {})}
        />
      </FormGroup>
    </FormControl>
  );
}

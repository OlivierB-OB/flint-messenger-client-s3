import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { PasswordRequirements } from './PasswordRequirements';
import { IFormField, IPasswordField, IProfileFormFields } from '../types';

export interface ICredentialsSectionProps {
  password: IPasswordField;
  confirmation: IFormField<string>;
  update<T extends keyof IProfileFormFields>(field: T, value: IProfileFormFields[T]['value']): void;
}

export function CredentialsSection({ password, confirmation, update }: ICredentialsSectionProps) {
  return (
    <FormControl component="fieldset" fullWidth={true}>
      <FormLabel component="legend" style={{ margin: '1rem 0' }}>
        Your credentials:
      </FormLabel>
      <FormGroup>
        <TextField
          type="password"
          label="Password"
          value={password.value}
          fullWidth={true}
          onChange={(event) => update('password', event.target.value)}
          {...(!password.isValid ? { error: true, helperText: password.error } : {})}
        />
        <TextField
          type="password"
          label="Password confirmation"
          value={confirmation.value}
          required={!!password.value}
          fullWidth={true}
          onChange={(event) => update('confirmation', event.target.value)}
          {...(!confirmation.isValid ? { error: true, helperText: confirmation.error } : {})}
        />
        <PasswordRequirements password={password} />
      </FormGroup>
    </FormControl>
  );
}

import Grid from '@material-ui/core/Grid';
import React from 'react';
import { PasswordRequirement } from './PasswordRequirement';
import { IPasswordField } from '../types';

export interface IPasswordRequirementsProps {
  password: IPasswordField;
}

export function PasswordRequirements({ password }: IPasswordRequirementsProps) {
  const { hasLower, hasUpper, hasNumber, hasSymbol, hasValidLength } = password;
  return (
    <Grid container direction="column" alignContent="flex-start" style={{ margin: '1rem 0' }}>
      <PasswordRequirement check={hasLower} message="password contains some lowercase characters..." />
      <PasswordRequirement check={hasUpper} message="password contains some uppercase characters..." />
      <PasswordRequirement check={hasNumber} message="password contains some numbers..." />
      <PasswordRequirement check={hasSymbol} message="password contains some symbols..." />
      <PasswordRequirement check={hasValidLength} message="password contains 8..30 characters..." />
    </Grid>
  );
}

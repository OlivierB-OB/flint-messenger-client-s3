import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import React from 'react';

export interface IPasswordRequirementProps {
  check: boolean;
  message: string;
}

export function PasswordRequirement({ check, message }: IPasswordRequirementProps) {
  return (
    <Grid container item alignItems="center" style={{ fontSize: 'small' }}>
      {check ? (
        <CheckCircleOutline style={{ fontSize: 'inherit' }} />
      ) : (
        <RadioButtonUnchecked style={{ fontSize: 'inherit' }} />
      )}
      <Typography style={{ fontSize: 'inherit' }}>{message}</Typography>
    </Grid>
  );
}

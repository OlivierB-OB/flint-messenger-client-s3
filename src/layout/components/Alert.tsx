import LabAlert from '@material-ui/lab/Alert';
import React from 'react';

export interface IAlertProps {
  status: string;
  error?: string;
  success?: string;
}

export function Alert({ status, error, success }: IAlertProps) {
  error = error || 'Something really bad happened...';
  if (status === 'error') return <LabAlert severity="error">{error}</LabAlert>;
  if (status === 'success' && success) return <LabAlert severity="success">{success}</LabAlert>;
  return null;
}

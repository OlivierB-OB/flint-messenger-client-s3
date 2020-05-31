import Box from '@material-ui/core/Box';
import React from 'react';

export interface ILoginTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function LoginTabPanel({ children, value, index }: ILoginTabPanelProps) {
  const content = value === index ? <Box>{children}</Box> : null;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {content}
    </div>
  );
}

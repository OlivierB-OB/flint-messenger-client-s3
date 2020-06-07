import React, { Fragment } from 'react';

export interface IPrettyDateProps {
  date: string;
}

const fdate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const ftime = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
});

export function PrettyDate({ date }: IPrettyDateProps) {
  const dateObject = new Date(date);
  return (
    <Fragment>
      {fdate.format(dateObject)}
      {' at '}
      {ftime.format(dateObject)}
    </Fragment>
  );
}

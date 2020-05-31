import React, { Fragment } from 'react';
import { IUserInfo } from '../types';

export interface IUserNameProps {
  info?: IUserInfo;
}

export function UserName({ info }: IUserNameProps) {
  const { lastName, firstName } = info || { firstName: 'Unknown', lastName: 'user' };
  const details = `${firstName} ${lastName}`;
  return <Fragment>{details}</Fragment>;
}

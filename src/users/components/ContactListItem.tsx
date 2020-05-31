import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import React, { Fragment } from 'react';
import { IUserInfo } from '../types';
import { UserAvatar } from './UserAvatar';
import { UserName } from './UserName';

export interface IContactListItemProps {
  info: IUserInfo;
}

export function ContactListItem({ info }: IContactListItemProps) {
  const { status } = info;
  return (
    <Fragment>
      <ListItemAvatar>
        <UserAvatar info={info} />
      </ListItemAvatar>
      <ListItemText primary={<UserName info={info} />} secondary={status} />
    </Fragment>
  );
}

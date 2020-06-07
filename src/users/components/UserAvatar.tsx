import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import statusBadgeFactory from './statusBadgeFactory';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IUserInfo } from '../types';

const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    secondary: {
      color: theme.palette.getContrastText(theme.palette.secondary.dark),
      backgroundColor: theme.palette.secondary.dark,
    },
  }),
);

export interface IUserAvatarProps {
  info?: IUserInfo;
}

// FIXME support profile picture

export function UserAvatar({ info }: IUserAvatarProps) {
  const { lastName, firstName, status } = info || { firstName: '?', lastName: '?', status: 'offline' };
  const initials = `${firstName[0]}${lastName[0]}`;
  const StatusBadge = statusBadgeFactory(status);
  const classes = useStyles();
  return (
    <StatusBadge variant="dot" overlap="circle" anchorOrigin={anchorOrigin}>
      <Avatar className={classes.secondary}>{initials}</Avatar>
    </StatusBadge>
  );
}

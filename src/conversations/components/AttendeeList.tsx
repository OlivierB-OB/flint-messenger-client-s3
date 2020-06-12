import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import React from 'react';
import { ContactAvatar } from '../../users/components/ContactAvatar';
import { ContactName } from '../../users/components/ContactName';

export interface IAttendeeListProps {
  targets: string[];
}

export function AttendeeList({ targets }: IAttendeeListProps) {
  return (
    <List>
      {targets.map((target) => (
        <ListItem key={target}>
          <ListItemAvatar>
            <ContactAvatar target={target} />
          </ListItemAvatar>
          <ListItemText primary={<ContactName target={target} />} />
        </ListItem>
      ))}
    </List>
  );
}

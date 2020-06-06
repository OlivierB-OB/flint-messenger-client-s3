import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import React, { Fragment } from 'react';
import { IConversation } from '../types';
import { ContactAvatar } from '../../users/components/ContactAvatar';
import { ContactName } from '../../users/components/ContactName';

export interface IConversationListItemProps {
  conversation: IConversation;
}

const fdate = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const ftime = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
});

export function ConversationListItem({ conversation }: IConversationListItemProps) {
  const { unseenMessages, messages, target, updatedAt } = conversation;
  const snippet = messages[messages.length - 1]?.content.substr(0, 25);
  const lastUpdate = new Date(updatedAt);
  return (
    <Fragment>
      <ListItemAvatar>
        <Badge badgeContent={unseenMessages} color="primary">
          <ContactAvatar target={target} />
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={snippet}
        secondary={
          <span>
            <ContactName target={target} />
            {' - '}
            {fdate.format(lastUpdate)}
            {' at '}
            {ftime.format(lastUpdate)}
          </span>
        }
      />
    </Fragment>
  );
}

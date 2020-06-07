import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import React, { Fragment } from 'react';
import { IConversation } from '../types';
import { ContactAvatar } from '../../users/components/ContactAvatar';
import { PrettyDate } from '../../layout/components/PrettyDate';

export interface IConversationListItemProps {
  conversation: IConversation;
}

export function ConversationListItem({ conversation }: IConversationListItemProps) {
  const { unseenMessages, messages, target, updatedAt } = conversation;
  const snippet = messages[messages.length - 1]?.content.substr(0, 25);
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
            Last update
            {': '}
            <PrettyDate date={updatedAt} />
          </span>
        }
      />
    </Fragment>
  );
}

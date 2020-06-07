import React, { Fragment } from 'react';
import { IConversationMessage } from '../types';
import { ListItemText, ListItemAvatar } from '@material-ui/core';
import { ContactName } from '../../users/components/ContactName';
import { ContactAvatar } from '../../users/components/ContactAvatar';
import { PrettyDate } from '../../layout/components/PrettyDate';

export interface IChatMessageProps {
  message: IConversationMessage;
}

export function ChatMessage({ message }: IChatMessageProps) {
  return (
    <Fragment>
      <ListItemAvatar>
        <ContactAvatar target={message.emitter} />
      </ListItemAvatar>
      <ListItemText
        primary={message.content}
        secondary={
          <span>
            <ContactName target={message.emitter} />
            {' - '}
            <PrettyDate date={message.createdAt} />
          </span>
        }
      />
    </Fragment>
  );
}

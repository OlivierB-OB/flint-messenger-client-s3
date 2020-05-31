import React, { Fragment } from 'react';
import { IConversationMessage } from '../types';
import { ListItemText, ListItemAvatar } from '@material-ui/core';
import { ContactName } from '../../users/components/ContactName';
import { ContactAvatar } from '../../users/components/ContactAvatar';

export interface IChatMessageProps {
  message: IConversationMessage;
}

const fdate = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const ftime = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
});

export function ChatMessage({ message }: IChatMessageProps) {
  const createdAt = new Date(message.createdAt);
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
            {fdate.format(createdAt)}
            {' at '}
            {ftime.format(createdAt)}
          </span>
        }
      />
    </Fragment>
  );
}

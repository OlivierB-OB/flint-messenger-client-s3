import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, { Fragment, useRef, useEffect } from 'react';
import { IConversationMessage } from '../types';
import { ChatMessage } from './ChatMessage';

export interface IChatMessagesProps {
  messages: IConversationMessage[];
}

export function ChatMessages({ messages }: IChatMessagesProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => ref.current?.scrollIntoView(false));
  if (!messages.length) return <span>There is currently no message in the conversation...</span>;
  return (
    <Fragment>
      <List>
        {messages.map((message) => (
          <ListItem key={message.createdAt}>
            <ChatMessage message={message} />
          </ListItem>
        ))}
      </List>
      <span ref={ref} />
    </Fragment>
  );
}

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, { Fragment, useRef, useEffect } from 'react';
import { IConversationMessage } from '../types';
import { ChatMessage } from './ChatMessage';

export interface IChatMessagesProps {
  conversationId?: string;
  messages: IConversationMessage[];
  conversationSeen: (id: string) => void;
}

export function ChatMessages({ messages, conversationId, conversationSeen }: IChatMessagesProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (conversationId) conversationSeen(conversationId);
  }, [conversationId, messages, conversationSeen]);
  useEffect(() => ref.current?.scrollIntoView(false));
  if (!messages.length) return <span>There is currently no message in the conversation...</span>;
  return (
    <Fragment>
      <List>
        {messages.map((message) => (
          <ListItem key={message._id}>
            <ChatMessage message={message} />
          </ListItem>
        ))}
      </List>
      <span ref={ref} />
    </Fragment>
  );
}

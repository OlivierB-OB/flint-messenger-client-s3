import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { match as Match } from 'react-router-dom';
import { connect } from 'react-redux';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { IAppState } from '../../appReducer';
import { IConversation, IConversationsStatus } from '../types';
import { Alert } from '../../layout/components/Alert';

export interface IChatDisplayProps {
  status: IConversationsStatus;
  conversationId?: string;
  conversation?: IConversation;
  updateMessageEdition: (text: string) => void;
}

export function ChatDisplay({ status, conversationId, conversation }: IChatDisplayProps) {
  if (!conversationId || !conversation) return null;
  const progress = status === 'sending' ? <LinearProgress /> : null;
  return (
    <Container style={{ height: '100%', padding: '1rem', boxSizing: 'border-box' }}>
      <Box style={{ height: '5%' }}>
        <Alert status={status} />
        {progress}
      </Box>
      <Box style={{ height: '70%', overflow: 'auto' }}>
        <ChatMessages messages={conversation.messages} />
      </Box>
      <Box style={{ height: '20%' }}>
        <ChatInput conversationId={conversationId} />
      </Box>
    </Container>
  );
}

export interface IChatProps {
  match: Match<{ conversationId: string }>;
}

const mapStateToProps = ({ conversations }: IAppState, { match }: IChatProps) => ({
  status: conversations.status,
  conversationId: match.params?.conversationId,
  conversation: conversations.conversations.find(({ uid }) => {
    return uid === match.params?.conversationId;
  }),
});

export const Chat = connect(mapStateToProps)(ChatDisplay);

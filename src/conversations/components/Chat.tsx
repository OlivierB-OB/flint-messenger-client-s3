import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { connect } from 'react-redux';
import { match as Match } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { IAppState } from '../../appReducer';
import { IConversation, IConversationsStatus } from '../types';
import { Alert } from '../../layout/components/Alert';
import { makeConversationSeen } from '../actions/makeConversationSeen';

export interface IChatDisplayProps {
  isCallChat: boolean;
  status: IConversationsStatus;
  conversationId?: string;
  conversation?: IConversation;
  conversationSeen: (id: string) => void;
}

export function ChatDisplay({ isCallChat, status, conversationId, conversation, conversationSeen }: IChatDisplayProps) {
  if (!conversationId || !conversation) return null;
  const progress = status === 'sending' ? <LinearProgress /> : null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 2rem)', padding: '1rem', boxSizing: 'border-box' }}>
      <div style={{ flexGrow: 0, height: '40px' }}>
        <Alert status={status} />
        {progress}
      </div>
      <div style={{ flexGrow: 1, overflow: 'auto' }}>
        <ChatMessages
          conversationId={conversationId}
          messages={conversation.messages}
          conversationSeen={conversationSeen}
        />
      </div>
      <div style={{ flexGrow: 0, height: '60px' }}>
        <ChatInput isCallChat={isCallChat} conversationId={conversationId} />
      </div>
    </div>
  );
}

export interface IChatProps {
  match: Match<{ conversationId: string }>;
}

const mapStateToProps = ({ conversations }: IAppState, { match }: IChatProps) => ({
  isCallChat: false,
  status: conversations.status,
  conversationId: match.params?.conversationId,
  conversation: conversations.conversations.find(({ _id }) => {
    return _id === match.params?.conversationId;
  }),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  conversationSeen: (id: string) => void dispatch(makeConversationSeen(id)),
});

export const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatDisplay);

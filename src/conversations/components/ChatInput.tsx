import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeSendMessage } from '../actions/makeSendMessage';
import { updateMessageEdition } from '../actions/updateMessageEdition';
import { StartCallButton } from '../../call/components/StartCallButton';
import { Fab } from '@material-ui/core';

interface IChatInputDisplayProps {
  isCallChat: boolean;
  conversationId: string;
  messageEdition: string;
  updateMessageEdition: (text: string) => void;
  sendMessage: (conversationId: string) => void;
}

export function ChatInputDisplay({
  isCallChat,
  messageEdition,
  conversationId,
  updateMessageEdition,
  sendMessage,
}: IChatInputDisplayProps) {
  const startCallBtn = isCallChat ? null : <StartCallButton conversationId={conversationId} />;
  useEffect(() => updateMessageEdition(''), [updateMessageEdition, conversationId]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(conversationId);
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <TextField
            fullWidth={true}
            value={messageEdition}
            variant="filled"
            onChange={(event) => updateMessageEdition(event.target.value)}
          />
        </div>
        <div
          style={{
            flexGrow: 0,
            display: 'flex',
            width: '150px',
            justifyContent: 'space-around',
          }}
        >
          <Fab type="submit" color="primary" aria-label="send">
            <Send fontSize="large" />
          </Fab>
          {startCallBtn}
        </div>
      </div>
    </form>
  );
}

export interface IChatInputProps {
  isCallChat: boolean;
  conversationId: string;
}

const mapStateToProps = ({ conversations }: IAppState, { isCallChat, conversationId }: IChatInputProps) => ({
  isCallChat,
  conversationId,
  messageEdition: conversations.messageEdition,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  updateMessageEdition: (text: string) => void dispatch(updateMessageEdition(text)),
  sendMessage: (conversationId: string) => void dispatch(makeSendMessage(conversationId)),
});

export const ChatInput = connect(mapStateToProps, mapDispatchToProps)(ChatInputDisplay);

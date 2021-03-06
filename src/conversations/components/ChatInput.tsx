import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeSendMessage } from '../actions/makeSendMessage';
import { updateMessageEdition } from '../actions/updateMessageEdition';

interface IChatInputDisplayProps {
  conversationId: string;
  messageEdition: string;
  updateMessageEdition: (text: string) => void;
  sendMessage: (conversationId: string) => void;
}

export function ChatInputDisplay({
  messageEdition,
  conversationId,
  updateMessageEdition,
  sendMessage,
}: IChatInputDisplayProps) {
  useEffect(() => updateMessageEdition(''), [updateMessageEdition, conversationId]);
  return (
    <form onSubmit={(e) => {e.preventDefault(); sendMessage(conversationId)}}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={11}>
          <TextField
            fullWidth={true}
            value={messageEdition}
            variant="filled"
            onChange={(event) => updateMessageEdition(event.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="contacts" type="submit">
            <Send fontSize="large" color="primary" />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
}

export interface IChatInputProps {
  conversationId: string;
}

const mapStateToProps = ({ conversations }: IAppState, { conversationId }: IChatInputProps) => ({
  conversationId,
  messageEdition: conversations.messageEdition,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  updateMessageEdition: (text: string) => void dispatch(updateMessageEdition(text)),
  sendMessage: (conversationId: string) => void dispatch(makeSendMessage(conversationId)),
});

export const ChatInput = connect(mapStateToProps, mapDispatchToProps)(ChatInputDisplay);

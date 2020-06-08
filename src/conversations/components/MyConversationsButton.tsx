import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Forum from '@material-ui/icons/Forum';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeShowConversationList } from '../actions/makeShowConversationList';

interface IShowConversationsButtonProps {
  unseenMessages: number;
  showConversationList: () => void;
}

export function ShowConversationsButton({ unseenMessages, showConversationList }: IShowConversationsButtonProps) {
  return (
    <IconButton aria-label="contacts" onClick={showConversationList}>
      <Badge badgeContent={unseenMessages} color="error" anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Forum fontSize="large" />
      </Badge>
    </IconButton>
  );
}

const mapStateToProps = ({ conversations }: IAppState) => ({
  unseenMessages: conversations.unseenMessages,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  showConversationList: () => dispatch(makeShowConversationList()),
});

export const MyConversationsButton = connect(mapStateToProps, mapDispatchToProps)(ShowConversationsButton);

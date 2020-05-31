import IconButton from '@material-ui/core/IconButton';
import Forum from '@material-ui/icons/Forum';
import React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { showConversationList } from '../actions/showConversationList';

interface IShowConversationsButtonProps {
  showConversationList: () => void;
}

function ShowConversationsButton({ showConversationList }: IShowConversationsButtonProps) {
  return (
    <IconButton aria-label="contacts" onClick={showConversationList}>
      <Forum fontSize="large" />
    </IconButton>
  );
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  showConversationList: () => dispatch(showConversationList()),
});

export const MyConversationsButton = connect(undefined, mapDispatchToProps)(ShowConversationsButton);

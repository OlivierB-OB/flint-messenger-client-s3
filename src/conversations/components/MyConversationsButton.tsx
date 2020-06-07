import IconButton from '@material-ui/core/IconButton';
import Forum from '@material-ui/icons/Forum';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeShowConversationList } from '../actions/makeShowConversationList';

interface IShowConversationsButtonProps {
  showConversationList: () => void;
}

// FIXME should display aggregated unseen message as a badge

export function ShowConversationsButton({ showConversationList }: IShowConversationsButtonProps) {
  return (
    <IconButton aria-label="contacts" onClick={showConversationList}>
      <Forum fontSize="large" />
    </IconButton>
  );
}
const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  showConversationList: () => dispatch(makeShowConversationList()),
});

export const MyConversationsButton = connect(undefined, mapDispatchToProps)(ShowConversationsButton);

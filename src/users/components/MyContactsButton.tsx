import IconButton from '@material-ui/core/IconButton';
import Contacts from '@material-ui/icons/Contacts';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeShowUsers } from '../actions/makeShowUsers';

export interface IShowContactsButtonProps {
  showContactList: () => void;
}

export function ShowContactsButton({ showContactList }: IShowContactsButtonProps) {
  return (
    <IconButton aria-label="contacts" onClick={showContactList}>
      <Contacts fontSize="large" />
    </IconButton>
  );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  showContactList: () => dispatch(makeShowUsers()),
});

export const MyContactsButton = connect(undefined, mapDispatchToProps)(ShowContactsButton);

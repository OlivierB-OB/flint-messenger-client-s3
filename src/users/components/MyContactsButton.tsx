import IconButton from '@material-ui/core/IconButton';
import Contacts from '@material-ui/icons/Contacts';
import React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { showUsersList } from '../actions/showUsersList';

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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  showContactList: () => dispatch(showUsersList()),
});

export const MyContactsButton = connect(undefined, mapDispatchToProps)(ShowContactsButton);

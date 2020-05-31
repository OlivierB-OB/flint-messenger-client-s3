import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeCreateConversation } from '../../conversations/actions/makeCreateConversation';
import { hideUsersList } from '../actions/hideUsersList';
import { IUserInfo, IUsersStateStatus } from '../types';
import { ContactListItem } from './ContactListItem';
import { Loading } from '../../layout/components/Loading';

export interface IContactListProps {
  status: IUsersStateStatus;
  show: boolean;
  list: IUserInfo[];
  hideContactList: () => void;
  createConversation: (targetId: string) => void;
}

export function ContactList(props: IContactListProps) {
  const { status, list, show, hideContactList, createConversation } = props;
  const loading = status === 'unavailable' ? <Loading /> : null;
  return (
    <Drawer anchor="left" open={show} onClose={hideContactList}>
      <Box style={{ minWidth: '300px' }}>
        {loading}
        <List>
          {loading || list.length ? null : (
            <ListItem>
              <ListItemText primary="no contact available..." />
            </ListItem>
          )}
          {list.map((user) => (
            <ListItem button onClick={() => createConversation(user.uid)} key={user.uid}>
              <ContactListItem info={user} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

const mapStateToProps = ({ users }: IAppState) => ({
  status: users.status,
  show: users.show,
  list: users.list,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  hideContactList: () => dispatch(hideUsersList()),
  createConversation: (targetId: string) => dispatch(makeCreateConversation(targetId)),
});

export const MyContacts = connect(mapStateToProps, mapDispatchToProps)(ContactList);

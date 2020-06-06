import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeCreateConversation } from '../../conversations/actions/makeCreateConversation';
import { IUserInfo, IUsersStateStatus } from '../types';
import { ContactListItem } from './ContactListItem';
import { Loading } from '../../layout/components/Loading';

export interface IContactListProps {
  status: IUsersStateStatus;
  list: IUserInfo[];
  createConversation: (targetId: string) => void;
}

export function ContactList(props: IContactListProps) {
  const { status, list, createConversation } = props;
  const loading = status === 'unavailable' ? <Loading /> : null;
  return (
    <Box style={{ minWidth: '300px' }}>
      {loading}
      <List>
        {loading || list.length ? null : (
          <ListItem>
            <ListItemText primary="no contact available..." />
          </ListItem>
        )}
        {list.map((user) => (
          <ListItem button onClick={() => createConversation(user._id)} key={user._id}>
            <ContactListItem info={user} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

const mapStateToProps = ({ users }: IAppState) => ({
  status: users.status,
  list: users.list,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  createConversation: (targetId: string) => dispatch(makeCreateConversation(targetId)),
});

export const MyContacts = connect(mapStateToProps, mapDispatchToProps)(ContactList);

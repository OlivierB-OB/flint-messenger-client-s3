import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { useRouteMatch } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeCreateConversation } from '../../conversations/actions/makeCreateConversation';
import { IUserInfo, IUsersStateStatus } from '../types';
import { ContactListItem } from './ContactListItem';
import { Loading } from '../../layout/components/Loading';
import { addConversationTarget } from '../../conversations/actions/addConversationTarget';

export interface IContactListProps {
  status: IUsersStateStatus;
  list: IUserInfo[];
  createConversation: (targetId: string) => void;
  addToConversation: (conversationId: string, targetId: string) => void;
}

export function ContactList(props: IContactListProps) {
  const { status, list, createConversation, addToConversation } = props;
  const loading = status === 'unavailable' ? <Loading /> : null;
  const match = useRouteMatch<{ conversationId: string }>("/conversation/:conversationId");
  const conversationId = match?.params.conversationId;
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
            {
              !conversationId ? null : (
                <ListItemSecondaryAction>
                  <IconButton onClick={() => addToConversation(conversationId, user._id)}>
                    <PersonAdd />
                  </IconButton>
                </ListItemSecondaryAction>
              )
            }
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
  addToConversation: (conversationId: string, targetId: string) => dispatch(addConversationTarget(conversationId, targetId)),
});

export const MyContacts = connect(mapStateToProps, mapDispatchToProps)(ContactList);

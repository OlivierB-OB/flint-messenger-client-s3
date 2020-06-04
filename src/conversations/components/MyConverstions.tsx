import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAppState } from '../../appReducer';
import { IConversation, IConversationsStatus } from '../types';
import { ConversationListItem } from './ConversationListItem';
import { Loading } from '../../layout/components/Loading';

export interface IConversationListProps {
  status: IConversationsStatus;
  list: IConversation[];
}

export function ConversationList({ status, list }: IConversationListProps) {
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
        {list.map((conversation) => (
          <ListItem button component={Link} to={`/conversation/${conversation._id}`} key={conversation._id}>
            <ConversationListItem conversation={conversation} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

const mapStateToProps = ({ conversations }: IAppState) => ({
  status: conversations.status,
  list: conversations.conversations,
});

export const MyConversations = connect(mapStateToProps)(ConversationList);

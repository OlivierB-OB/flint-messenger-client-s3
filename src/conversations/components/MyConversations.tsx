import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { IAppState } from '../../appReducer';
import { IConversation, IConversationsStatus } from '../types';
import { ConversationListItem } from './ConversationListItem';
import { Loading } from '../../layout/components/Loading';

export interface IConversationListProps {
  status: IConversationsStatus;
  list: IConversation[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.light,
    },
  }),
);

export function ConversationList({ status, list }: IConversationListProps) {
  const loading = status === 'unavailable' ? <Loading /> : null;
  const { selected } = useStyles();
  const match = useRouteMatch<{ conversationId: string }>('/conversation/:conversationId');
  const conversationId = match?.params.conversationId;
  return (
    <Box style={{ minWidth: '300px' }}>
      {loading}
      <List>
        {loading || list.length ? null : (
          <ListItem>
            <ListItemText primary="no conversation available..." />
          </ListItem>
        )}
        {list.map((conversation) => (
          <ListItem
            className={conversationId === conversation._id ? selected : undefined}
            button
            component={Link}
            to={`/conversation/${conversation._id}`}
            key={conversation._id}
          >
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

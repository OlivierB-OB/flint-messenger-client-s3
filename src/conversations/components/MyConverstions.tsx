import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch, Action } from 'redux';
import { IAppState } from '../../appReducer';
import { hideConversationList } from '../actions/hideConversationList';
import { IConversation, IConversationsStatus } from '../types';
import { ConversationListItem } from './ConversationListItem';
import { Loading } from '../../layout/components/Loading';

export interface IConversationListProps {
  status: IConversationsStatus;
  show: boolean;
  list: IConversation[];
  hideConversationList: () => void;
}

export function ConversationList({ status, list, show, hideConversationList }: IConversationListProps) {
  const loading = status === 'unavailable' ? <Loading /> : null;
  return (
    <Drawer anchor="left" open={show} onClose={hideConversationList}>
      <Box style={{ minWidth: '300px' }}>
        {loading}
        <List>
          {loading || list.length ? null : (
            <ListItem>
              <ListItemText primary="no contact available..." />
            </ListItem>
          )}
          {list.map((conversation) => (
            <ListItem button component={Link} to={`/conversation/${conversation.uid}`} key={conversation.uid}>
              <ConversationListItem conversation={conversation} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

const mapStateToProps = ({ conversations }: IAppState) => ({
  status: conversations.status,
  list: conversations.conversations,
  show: conversations.show,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  hideConversationList: () => dispatch(hideConversationList()),
});

export const MyConversations = connect(mapStateToProps, mapDispatchToProps)(ConversationList);

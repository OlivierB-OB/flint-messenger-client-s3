import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { IAppState } from '../../appReducer';
import { IDrawerContent } from '../types';
import { hideDrawer } from '../actions/hideDrawer';
import { MyContacts } from '../../users/components/MyContacts';
import { MyConversations } from '../../conversations/components/MyConversations';

export interface IDrawerDisplayProps {
  show: boolean;
  content?: IDrawerContent;
  hideDrawer: () => void;
}

export const drawerWidth = 500;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      textAlign: 'right',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    paper: {
      width: drawerWidth,
    },
  }),
);

export function DrawerDisplay({ show, content, hideDrawer }: IDrawerDisplayProps) {
  const { drawerHeader, paper } = useStyles();
  const contentDisplay =
    content === 'contacts' ? <MyContacts /> : content === 'conversations' ? <MyConversations /> : null;
  return (
    <Drawer variant="persistent" anchor="left" open={show} onClose={hideDrawer} classes={{ paper }}>
      <Box className={drawerHeader}>
        <IconButton aria-label="collapse" onClick={hideDrawer}>
          <ArrowBackIos />
        </IconButton>
      </Box>
      <Box>{contentDisplay}</Box>
    </Drawer>
  );
}

const mapStateToProps = ({ layout }: IAppState) => ({
  show: layout.showDrawer,
  content: layout.drawerContent,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  hideDrawer: () => dispatch(hideDrawer()),
});

export const AppDrawer = connect(mapStateToProps, mapDispatchToProps)(DrawerDisplay);

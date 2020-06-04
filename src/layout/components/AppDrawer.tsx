import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { IAppState } from '../../appReducer';
import { IDrawerContent } from '../types';
import { hideDrawer } from '../actions/hideDrawer';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { MyContacts } from '../../users/components/MyContacts';
import { MyConversations } from '../../conversations/components/MyConverstions';

export interface IDrawerDisplayProps {
  show: boolean;
  content?: IDrawerContent;
  hideDrawer: () => void;
}

export const drawerWidth = 500;

const useStyles = makeStyles(() =>
  createStyles({
    drawerHeader: {
      textAlign: 'right',
      position: "sticky",
      top: 0,
    },
    paper: {
      width: drawerWidth,
    },
  }),
);

function DrawerDisplay({ show, content, hideDrawer }: IDrawerDisplayProps) {
  const { drawerHeader, paper } = useStyles();
  const contentDisplay = content === 'contacts' ? <MyContacts /> :
    content === 'conversations' ? <MyConversations /> :
    null;
  return (
    <Drawer variant="persistent" anchor="left" open={show} onClose={hideDrawer} classes={{ paper }}>
      <Box className={drawerHeader}>
        <IconButton aria-label="collapse" onClick={hideDrawer}>
          <ArrowBackIos />
        </IconButton>
      </Box>
      <Box>
        {contentDisplay}
      </Box>
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

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { AppDrawer, drawerWidth } from './AppDrawer';
import { AppMenu } from './AppMenu';
import { AppContent } from './AppContent';
import { IAppState } from '../../appReducer';

interface ILayoutDisplayProps {
  showDrawer: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      width: `100%`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
    },
  }),
);

export function LayoutDisplay({ showDrawer }: ILayoutDisplayProps) {
  const classes = useStyles();
  const contentClasses = [classes.content, showDrawer && classes.contentShift].filter(Boolean).join(' ');
  return (
    <div>
      <div className={contentClasses}>
        <AppMenu />
        <AppContent />
      </div>
      <AppDrawer />
    </div>
  );
}

const mapStateToProps = ({ layout }: IAppState) => ({
  showDrawer: layout.showDrawer,
});

export const AppLayout = connect(mapStateToProps)(LayoutDisplay);

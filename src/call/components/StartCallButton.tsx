import Fab from '@material-ui/core/Fab';
import Call from '@material-ui/icons/Call';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeStartCall } from '../actions/makeStartCall';

interface IStartCallButtonDisplayProps {
  conversationId: string;
  start: (conversationId: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    start: {
      color: theme.palette.success.contrastText,
      backgroundColor: theme.palette.success.main,
    },
  }),
);

export function StartCallButtonDisplay({ conversationId, start }: IStartCallButtonDisplayProps) {
  const classes = useStyles();
  return (
    <Fab className={classes.start} aria-label="call" onClick={() => start(conversationId)}>
      <Call fontSize="large" />
    </Fab>
  );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  start: (conversationId: string) => dispatch(makeStartCall(conversationId)),
});

export const StartCallButton = connect(undefined, mapDispatchToProps)(StartCallButtonDisplay);

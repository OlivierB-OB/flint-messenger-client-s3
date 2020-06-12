import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { IIncomingCall } from '../types';
import { ContactName } from '../../users/components/ContactName';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';

interface IIncomingCallNotificationDisplayProps {
  show: boolean;
  incomingCall?: IIncomingCall;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accept: {
      color: theme.palette.success.contrastText,
      backgroundColor: theme.palette.success.main,
    },
    reject: {
      color: theme.palette.error.contrastText,
      backgroundColor: theme.palette.error.main,
    },
  }),
);

export function IncomingCallNotificationDisplay({ show, incomingCall }: IIncomingCallNotificationDisplayProps) {
  const classes = useStyles();
  if (!incomingCall) return null;
  return (
    <Dialog open={show}>
      <DialogContent>
        <DialogContentText>
          Incoming call from <ContactName target={incomingCall.target} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={incomingCall.reject} className={classes.reject}>
          Reject
        </Button>
        <Button onClick={incomingCall.accept} className={classes.accept} autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({ call }: IAppState) => ({
  show: !!call?.incomingCall,
  incomingCall: call?.incomingCall,
});

export const IncomingCallNotification = connect(mapStateToProps)(IncomingCallNotificationDisplay);

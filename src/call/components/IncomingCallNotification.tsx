import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react';
import { IIncomingCall } from '../types';
import { ContactName } from '../../users/components/ContactName';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';

interface IIncomingCallNotificationDisplayProps {
  incomingCall?: IIncomingCall;
}

export function IncomingCallNotificationDisplay({ incomingCall }: IIncomingCallNotificationDisplayProps) {
  if (!incomingCall) return null;
  return (
    <Dialog open={true} >
      <DialogContent>
        <DialogContentText>
          Incoming call from <ContactName target={incomingCall.target} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={incomingCall.accept} color="primary">
          Accept
        </Button>
        <Button onClick={incomingCall.reject} color="primary" autoFocus>
          Agree
          </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = ({ call }: IAppState) => ({
  incomingCall: call?.incomingCall,
});

export const IncomingCallNotification = connect(mapStateToProps)(IncomingCallNotificationDisplay);

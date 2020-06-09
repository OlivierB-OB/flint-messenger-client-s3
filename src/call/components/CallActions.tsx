import Fab from '@material-ui/core/Fab';
import CallEnd from '@material-ui/icons/CallEnd';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import SpeakerNotesOff from '@material-ui/icons/SpeakerNotesOff';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { makeStartLocalScreenShare } from '../actions/makeStartLocalScreenShare';
import { makeStopLocalScreenShare } from '../actions/makeStopLocalScreenShare';
import { makeEndCall } from '../actions/makeEndCall';
import { showDrawer } from '../../layout/actions/showDrawer';
import { hideDrawer } from '../../layout/actions/hideDrawer';
import { ILocalInputs } from '../types';
import { toggleCallAudioInput } from '../actions/toggleCallAudioInput';
import { toggleCallVideoInput } from '../actions/toggleCallVideoInput';

interface ICallActionsDisplayProps {
  isChatShown: boolean,
  localInputs?: ILocalInputs,
  remoteStream?: MediaStream,
  screenShareStream?: MediaStream,
  toggleAudio: () => void;
  toggleVideo: () => void;
  startLocalScreenShare: () => void;
  stopLocalScreenShare: () => void;
  showChat: () => void,
  hideChat: () => void,
  endCall: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dangerous: {
      color: theme.palette.error.contrastText,
      backgroundColor: theme.palette.error.main,
    },
  }),
);

export function CallActionsDisplay(props: ICallActionsDisplayProps) {
  const {
    isChatShown,
    localInputs,
    remoteStream,
    screenShareStream,
    toggleAudio,
    toggleVideo,
    startLocalScreenShare,
    stopLocalScreenShare,
    showChat,
    hideChat,
    endCall,
  } = props;
  const classes = useStyles()
  return (
    <div>
      <Fab
        onClick={isChatShown ? hideChat : showChat}
        color={isChatShown ? 'primary' : 'secondary'}
      >
        {
          isChatShown ?
            <SpeakerNotes fontSize='large' /> :
            <SpeakerNotesOff fontSize='large' />
        }
      </Fab>
      <Fab
        onClick={toggleAudio}
        color={localInputs?.audio.isActive ? 'primary' : 'secondary'}
        disabled={!localInputs?.audio.isAvailable}
      >
        {
          remoteStream ?
          <Mic  fontSize='large' /> :
          <MicOff  fontSize='large' />
        }
      </Fab>
      <Fab
        onClick={toggleVideo}
        color={localInputs?.video.isActive ? 'primary' : 'secondary'}
        disabled={!localInputs?.video.isAvailable}
      >
        {
          localInputs?.video.isActive ?
          <Videocam  fontSize='large' /> :
          <VideocamOff  fontSize='large' />
        }
      </Fab>
      <Fab
        onClick={screenShareStream ? stopLocalScreenShare : startLocalScreenShare}
        color={screenShareStream ? 'primary' : 'secondary'}
      >
        {
          screenShareStream ?
          <ScreenShare  fontSize='large' /> :
          <StopScreenShare  fontSize='large' />
        }
      </Fab>
      <Fab onClick={endCall} className={classes.dangerous}>
        <CallEnd  fontSize='large' />
      </Fab>
    </div>
  )
}

const mapStateToProps = ({ layout, call }: IAppState) => ({
  isChatShown: layout.showDrawer,
  localInputs: call.localInputs,
  remoteStream: call.remoteStream,
  screenShareStream: call.screenShareStream,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  toggleAudio: () => dispatch(toggleCallAudioInput()),
  toggleVideo: () => dispatch(toggleCallVideoInput()),
  startLocalScreenShare: () => dispatch(makeStartLocalScreenShare()),
  stopLocalScreenShare: () => dispatch(makeStopLocalScreenShare()),
  showChat: () => dispatch(showDrawer()),
  hideChat: () => dispatch(hideDrawer()),
  endCall: () => dispatch(makeEndCall()),
});

export const CallActions = connect(mapStateToProps, mapDispatchToProps)(CallActionsDisplay);
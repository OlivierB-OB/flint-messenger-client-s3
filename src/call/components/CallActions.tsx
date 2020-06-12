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
import { ILocalInputs, ILocalScreenShare } from '../types';
import { toggleCallAudioInput } from '../actions/toggleCallAudioInput';
import { toggleCallVideoInput } from '../actions/toggleCallVideoInput';

interface ICallActionsDisplayProps {
  conversationId?: string;
  isChatShown: boolean;
  localInputs?: ILocalInputs;
  localScreenShare?: ILocalScreenShare;
  screenShareStream?: MediaStream;
  toggleAudio: () => void;
  toggleVideo: () => void;
  startLocalScreenShare: (conversationId: string) => void;
  stopLocalScreenShare: () => void;
  showChat: () => void;
  hideChat: () => void;
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
    conversationId,
    isChatShown,
    localInputs,
    localScreenShare,
    screenShareStream,
    toggleAudio,
    toggleVideo,
    startLocalScreenShare,
    stopLocalScreenShare,
    showChat,
    hideChat,
    endCall,
  } = props;
  const classes = useStyles();
  return (
    <div>
      <Fab onClick={isChatShown ? hideChat : showChat} color={isChatShown ? 'primary' : 'secondary'}>
        {isChatShown ? <SpeakerNotes fontSize="large" /> : <SpeakerNotesOff fontSize="large" />}
      </Fab>
      <Fab
        onClick={toggleAudio}
        color={localInputs?.audio.isActive ? 'primary' : 'secondary'}
        disabled={!localInputs?.audio.isAvailable}
      >
        {localInputs?.audio.isActive ? <Mic fontSize="large" /> : <MicOff fontSize="large" />}
      </Fab>
      <Fab
        onClick={toggleVideo}
        color={localInputs?.video.isActive ? 'primary' : 'secondary'}
        disabled={!localInputs?.video.isAvailable}
      >
        {localInputs?.video.isActive ? <Videocam fontSize="large" /> : <VideocamOff fontSize="large" />}
      </Fab>
      <Fab
        onClick={
          screenShareStream
            ? stopLocalScreenShare
            : () => {
                if (conversationId) startLocalScreenShare(conversationId);
              }
        }
        color={!!localScreenShare ? 'primary' : 'secondary'}
        disabled={!localScreenShare && (!!screenShareStream as boolean)}
      >
        {!!localScreenShare ? <ScreenShare fontSize="large" /> : <StopScreenShare fontSize="large" />}
      </Fab>
      <Fab onClick={endCall} className={classes.dangerous}>
        <CallEnd fontSize="large" />
      </Fab>
    </div>
  );
}

const mapStateToProps = ({ layout, call }: IAppState) => ({
  conversationId: call.conversationId,
  isChatShown: layout.showDrawer,
  localInputs: call.inputs,
  localScreenShare: call.screenShare,
  screenShareStream: [call.screenShare?.stream, ...call.remotes.map(({ screenShare }) => screenShare)].find(Boolean),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  toggleAudio: () => dispatch(toggleCallAudioInput()),
  toggleVideo: () => dispatch(toggleCallVideoInput()),
  startLocalScreenShare: (conversationId: string) => dispatch(makeStartLocalScreenShare(conversationId)),
  stopLocalScreenShare: () => dispatch(makeStopLocalScreenShare()),
  showChat: () => dispatch(showDrawer()),
  hideChat: () => dispatch(hideDrawer()),
  endCall: () => dispatch(makeEndCall()),
});

export const CallActions = connect(mapStateToProps, mapDispatchToProps)(CallActionsDisplay);

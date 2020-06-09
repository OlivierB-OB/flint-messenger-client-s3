import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { ILocalInputs } from '../types';
import { CallActions } from './CallActions';
import { CallStreamBlock } from './CallStreamBlock';

interface ICallDisplayProps {
  localInputs?: ILocalInputs;
  remoteStream?: MediaStream;
  screenShareStream?: MediaStream;
}

export function CallDisplay(props: ICallDisplayProps) {
  const { localInputs, remoteStream, screenShareStream } = props;
  const secondaryScreen = (!screenShareStream) ? null : (
    <CallStreamBlock stream={remoteStream} />
  );
  const mainStream = screenShareStream || remoteStream;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'stretch', justifyContent: 'space-between', padding: '1rem' }}>
      <div style={{ display: 'flex', maxHeight: 'calc(100% - 56px - 2rem)', alignItems: 'stretch', justifyContent: 'stretch', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginRight: '1rem', flexGrow: 1 }}>
          <CallStreamBlock stream={mainStream} />
        </div>
        <div style={{ display: 'flex', maxWidth: '20%', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-around', flexGrow: 0 }}>
          <div style={{ maxWidth: '100%' }}>
            {secondaryScreen}
          </div>
          <div style={{ maxWidth: '100%' }}>
            <CallStreamBlock stream={localInputs?.stream} muted={true} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 0 }}>
        <CallActions />
      </div>
    </div>
  )
}

const mapStateToProps = ({ call }: IAppState) => ({
  localInputs: call.localInputs,
  remoteStream: call.remoteStream,
  screenShareStream: call.screenShareStream,
});

export const Call = connect(mapStateToProps)(CallDisplay);

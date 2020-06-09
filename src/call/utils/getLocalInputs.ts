import { ILocalInputs, ILocalInput } from '../types';

export async function getLocalInputs(): Promise<ILocalInputs> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  const inputs: ILocalInputs = {
    stream,
    audio: { isAvailable: false },
    video: { isAvailable: false },
  };
  stream.getTracks().forEach(track => {
    const { enabled, kind } = track;
    if (enabled && (kind === 'audio' || kind === 'video')) {
      inputs[kind] = toggleTrack(track);
    }
  });
  return inputs;
}

function toggleTrack(track: MediaStreamTrack): ILocalInput {
  console.log(track);
  track.enabled = !track.enabled;
  return {
    isAvailable: true,
    isActive: track.enabled,
    toggle: toggleTrack.bind(undefined, track),
  }
}

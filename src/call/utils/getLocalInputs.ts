import { ILocalInputs, ILocalInput } from '../types';
import { easyId } from './easyId';

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
  track.enabled = !track.enabled;
  console.log(`[${track.enabled ? 'ON' : 'OFF'}] local track: ${easyId(track.id)} [${track.kind}]`);
  return {
    isAvailable: true,
    isActive: track.enabled,
    toggle: toggleTrack.bind(undefined, track),
  }
}

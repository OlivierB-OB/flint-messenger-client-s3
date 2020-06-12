import { ILocalInputs, ILocalInput } from '../types';
import { easyId } from './easyId';

export async function getLocalInputs(): Promise<ILocalInputs> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  const inputs: ILocalInputs = {
    stream,
    audio: { isAvailable: false },
    video: { isAvailable: false },
    close(): void {
      this.stream.getTracks().forEach((track) => track.stop());
    },
  };
  stream.getTracks().forEach((track) => {
    const { enabled, kind } = track;
    if (enabled && (kind === 'audio' || kind === 'video')) {
      inputs[kind] = toggleTrack(track, true);
    }
  });
  return inputs;
}

function toggleTrack(track: MediaStreamTrack, preventToggle?: boolean): ILocalInput {
  if (!preventToggle) track.enabled = !track.enabled;
  console.log(`[${track.enabled ? 'ON' : 'OFF'}] local track: ${easyId(track.id)} [${track.kind}]`);
  return {
    isAvailable: true,
    isActive: track.enabled,
    toggle: toggleTrack.bind(undefined, track),
  };
}

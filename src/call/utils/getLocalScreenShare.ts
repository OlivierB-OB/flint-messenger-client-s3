import { ILocalScreenShare } from '../types';

export async function getLocalScreenShare(): Promise<ILocalScreenShare> {
  const stream: MediaStream = await (navigator.mediaDevices as any).getDisplayMedia({
    video: {
      cursor: "always"
    },
    audio: false
  });
  const localScreenShare: ILocalScreenShare = {
    stream,
    close(): void {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  };
  return localScreenShare;
}


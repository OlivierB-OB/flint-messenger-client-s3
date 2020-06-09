import React, { useRef, useEffect } from 'react';

interface ICallStreamBlockProps {
  stream?: MediaStream;
  muted?: boolean;
}

export function CallStreamBlock(props: ICallStreamBlockProps) {
  const ref = useRef<any>();
  useEffect(() => {
    if (ref.current) {
      console.log(`stream set ${props.muted}`)
      ref.current.srcObject = props.stream;
    }
  }, [ref, props.stream, props.muted])
  const muted = props.muted ? { muted: true } : {};
  return (
    <video
      ref={ref}
      style={{ maxWidth: '100%', maxHeight: '100%' }}
      autoPlay
      {...muted}
    />
  );
}

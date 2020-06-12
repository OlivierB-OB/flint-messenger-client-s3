export function displayCandidate(candidate: RTCIceCandidate) {
  const { protocol, address, port } = candidate as any;
  return `${protocol} ${address}:${port}`;
}

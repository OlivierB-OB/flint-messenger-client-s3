
interface IConfig {
  api_backend_url: string;
  socket_backend_url: string;
  stun_server_url: string;
  turn_server_url: string;
  stun_turn_user: string;
  stun_turn_pass: string;
}

export const config: IConfig = {
  api_backend_url: process.env.REACT_APP_BACKEND as string,
  socket_backend_url: process.env.REACT_APP_BACKEND as string,
  stun_server_url: process.env.REACT_APP_STUN_SERVER as string,
  turn_server_url: process.env.REACT_APP_TURN_SERVER as string,
  stun_turn_user: process.env.REACT_APP_STUN_TURN_USER as string,
  stun_turn_pass: process.env.REACT_APP_STUN_TURN_PASS as string,
}

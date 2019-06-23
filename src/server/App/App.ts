import uWS from 'uWebSockets.js';
import { logger } from '../logger';
import { bufferToString, deserializeControllerData } from '../../utils';
import User from './user';

class App {
  private app: uWS.TemplatedApp;
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
    this.app = uWS.App();

    this.app.ws('/wsendpoint', {
      /* Options */
      compression: 0,
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 10,
      /* Handlers */
      open: this.wsOpenHandler,
      message: this.wsMsgHandler,
      close: this.wsCloseHandler,
    });
  }

  public listen(port: number) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.app.listen(port, (token: uWS.us_listen_socket) => {
      if (token) return logger.info(`Listening to port ${port}`);
      return logger.error(`Failed to listen to port ${port}`);
    });
  }

  private wsOpenHandler = (ws: uWS.WebSocket, req: uWS.HttpRequest) => {
    const id: string = req.getHeader('sec-websocket-key');
    this.createUser(ws, id);
  };

  private wsMsgHandler = (
    ws: uWS.WebSocket,
    message: ArrayBuffer,
    isBinary: boolean,
  ) => {
    const user = this.users.get(ws.userId);
    if (!user) throw new Error('USER_NOT_FOUND');
    if (isBinary) {
      ws.send(JSON.stringify(deserializeControllerData(message)));
    } else {
      logger.info(`${user.id}: ${bufferToString(message)}`);
      ws.send(message, isBinary);
    }
  };

  private wsCloseHandler = (
    ws: uWS.WebSocket,
    // code: number,
    // message: ArrayBuffer,
  ) => {
    this.removeUser(ws);
  };

  private createUser(ws: uWS.WebSocket, id: string) {
    const user = new User(ws, id);
    this.users.set(id, user);
    ws.userId = id;
  }

  private removeUser(ws: uWS.WebSocket) {
    this.users.delete(ws.userId);
    // console.log(`Users count: ${this.users.size}`);
  }
}

export default App;

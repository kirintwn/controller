import uWS from 'uWebSockets.js';
import { logger } from '../logger';

class User {
  private ws: uWS.WebSocket;
  public id: string;

  constructor(ws: uWS.WebSocket, id: string) {
    this.ws = ws;
    this.id = id;
    logger.info(`new user: ${id}`);
    this.ws.send(`You are new user ${this.id}`);
  }
}

export default User;

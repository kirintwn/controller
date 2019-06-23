import { RecognizedString } from 'uWebSockets.js';

class Socket {
  private connection: WebSocket;
  private intervalId: number = NaN;
  private isReady: boolean = false;

  constructor(wsUrl: string) {
    this.connection = new WebSocket(wsUrl);
    this.connection.onopen = this.onOpen;
    this.connection.onclose = this.onClose;
    this.connection.onerror = (e) => this.onError(e);
    this.connection.onmessage = (e) => this.onMsg(e);
  }

  public destroy() {
    this.connection.close();
  }

  private onOpen = () => {
    this.isReady = true;
    this.startKeepAlive();
  };

  private onClose = () => {
    this.isReady = false;
    this.stopKeepAlive();
  };

  private onError = (e: Event) => {
    console.error(`Err: ${e}`);
  };

  private onMsg = (e: MessageEvent) => {
    console.log(`Msg: ${e.data}`);
  };

  private startKeepAlive() {
    this.intervalId = window.setInterval(
      () => this.connection.send('PING'),
      8000,
    );
  }

  private stopKeepAlive() {
    window.clearInterval(this.intervalId);
  }

  public send(msg: RecognizedString) {
    if (this.isReady) this.connection.send(msg);
  }
}

export default Socket;

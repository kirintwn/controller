import { JoystickManagerOptions } from 'nipplejs';
import isEqual from 'lodash/isEqual';
import Socket from './Socket';
import JoyStick from './JoyStick';
import Buttons from './Buttons';
import { serializeControllerData } from '../../utils/index';

class Controller {
  private socket: Socket;
  private joystick: JoyStick;
  private buttons: Buttons;
  private loopId: number = NaN;
  private lastData: ControllerData;

  constructor(
    wsUrl: string,
    joyStickOpts: JoystickManagerOptions,
    buttonDOMs: HTMLElement[],
    rate: number,
  ) {
    this.lastData = {
      move: { x: 0, y: 0 },
      buttons: [false, false],
    };
    this.socket = new Socket(wsUrl);
    this.joystick = new JoyStick(joyStickOpts);
    this.buttons = new Buttons(buttonDOMs);
    this.startSendData(rate);
  }

  public destroy() {
    this.stopSendData();
    this.joystick.destroy();
    this.buttons.destroy();
    this.socket.destroy();
  }

  private sendData() {
    this.socket.send(serializeControllerData(this.lastData));
  }

  private needUpdate(): boolean {
    const currData = this.data;
    if (!isEqual(this.lastData, currData)) {
      this.lastData = currData;
      return true;
    }
    return false;
  }

  private startSendData(rate: number) {
    this.loopId = window.setInterval(() => {
      if (this.needUpdate()) {
        this.sendData();
      }
    }, 1000 / rate);
  }

  private stopSendData() {
    window.clearInterval(this.loopId);
  }

  public get data(): ControllerData {
    return {
      move: Object.assign({}, this.joystick.moveData),
      buttons: Object.assign({}, this.buttons.state),
    };
  }
}

export default Controller;

import nipplejs from 'nipplejs';

class JoyStick {
  private _moveData: MoveData;
  private manager: nipplejs.JoystickManager;

  constructor(opts: nipplejs.JoystickManagerOptions) {
    this._moveData = { x: 0, y: 0 };
    this.manager = nipplejs.create(opts);

    this.manager.on('move', this.moveHandler);
    this.manager.on('end', this.endHandler);
  }

  private moveHandler = (
    _e: nipplejs.EventData,
    data: nipplejs.JoystickOutputData,
  ) => {
    const { distance, angle } = data;
    this._moveData.x = distance * Math.cos(angle.radian);
    this._moveData.y = distance * Math.sin(angle.radian);
  };

  private endHandler = () => {
    this._moveData.x = 0;
    this._moveData.y = 0;
  };

  public destroy() {
    this.manager.destroy();
  }

  get moveData(): MoveData {
    return this._moveData;
  }
}

export default JoyStick;

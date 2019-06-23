declare module '*';

interface MoveData {
  x: number;
  y: number;
}

interface ControllerData {
  move: MoveData;
  buttons: boolean[];
}

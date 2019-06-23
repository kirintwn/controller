const bufferToString = (msg: ArrayBuffer): string =>
  new TextDecoder('utf-8').decode(msg);

//   0                   1                   2                   3
//   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
//   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//   |   primaryBtn  | secondaryBtn  |      reserved for future      |
//   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//   |                       moveX_Float (4 bytes)                   |
//   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//   |                       moveY_Float (4 bytes)                   |
//   +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

const serializeControllerData = (data: ControllerData): ArrayBuffer => {
  const buffer = new ArrayBuffer(12);
  const dv = new DataView(buffer);
  dv.setUint8(0, Number(data.buttons[0]));
  dv.setUint8(1, Number(data.buttons[1]));
  dv.setUint16(2, 0, true);
  dv.setFloat32(4, data.move.x, true);
  dv.setFloat32(8, data.move.y, true);

  return buffer;
};
const deserializeControllerData = (buffer: ArrayBuffer): ControllerData => {
  const dv = new DataView(buffer);
  const data: ControllerData = {
    buttons: [Boolean(dv.getUint8(0)), Boolean(dv.getUint8(1))],
    move: {
      x: dv.getFloat32(4, true),
      y: dv.getFloat32(8, true),
    },
  };

  return data;
};

export { serializeControllerData, deserializeControllerData, bufferToString };

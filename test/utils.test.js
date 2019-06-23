/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import supertest from 'supertest';
import {
  serializeControllerData,
  deserializeControllerData,
} from '../src/utils';

beforeAll(async () => {
  // Add Smeth
});

afterAll(async () => {
  // Add Smth
});

beforeEach(async () => {
  // Add Smth
});

afterEach(async () => {
  // Add Smth
});

describe('test controllerData serialization', () => {
  test('should match as expected', async () => {
    const data = {
      move: { x: 123.456, y: 234.1245 },
      buttons: [true, false],
    };

    const buffer = serializeControllerData(data);
    const processedData = deserializeControllerData(buffer);
    expect(processedData.move.x).toBeCloseTo(data.move.x);
    expect(processedData.move.y).toBeCloseTo(data.move.y);
    expect(processedData.buttons).toEqual([true, false]);
  });
});

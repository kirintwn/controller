import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { JoystickManagerOptions } from 'nipplejs';
import './index.css';
import Controller from './Controller';

const joystickDOM = document.getElementById('joystick');
const button0DOM = document.getElementById('button0');
const button1DOM = document.getElementById('button1');
if (!joystickDOM || !button0DOM || !button1DOM) {
  throw new Error('NO_DOM_RENDERED');
}

const wsUrl = `ws://${window.location.host}/wsendpoint`;
const joyStickOpts: JoystickManagerOptions = {
  zone: joystickDOM,
  position: { left: '50%', top: '50%' },
  mode: 'static',
  color: 'red',
  size: 50,
};
const buttonDOMs: HTMLElement[] = [button0DOM, button1DOM];

const controller = new Controller(wsUrl, joyStickOpts, buttonDOMs, 50);

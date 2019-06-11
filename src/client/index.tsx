import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import './index.css';
import 'assets/example.png';

(async () => {
  render(<p>it works!</p>, document.querySelector('#react'));
})();

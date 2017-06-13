import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './views/App';
import { Signup } from './views/Signup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Signup />, div);
});

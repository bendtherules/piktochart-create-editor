import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CreateEditorApp } from './CreateEditorApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateEditorApp />, div);
});

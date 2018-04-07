import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CreateEditorApp } from './Components/CreateEditorApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <CreateEditorApp />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

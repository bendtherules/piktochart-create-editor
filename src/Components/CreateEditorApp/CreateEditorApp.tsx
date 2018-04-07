import * as React from 'react';
import './CreateEditorApp.css';
import { DraggableNode } from '../DraggableNode';

const logo = require('./logo.svg');

export class CreateEditorApp extends React.Component {
  render() {
    return (
      <div className="App">
        <DraggableNode>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
        </DraggableNode>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}
import * as React from 'react';
import './CreateEditorApp.css';
import { DragContainer } from '../DragContainer';
import { DraggableNode } from '../DraggableNode';

const logo = require('./logo.svg');

export class CreateEditorApp extends React.Component {
  logFn() {
    // tslint:disable-next-line:no-console
    console.log(arguments);
  }

  render() {
    return (
      <div className="App">
        <DragContainer id="test">
          <header className="App-header">
            <DraggableNode id="test-img" containerId="test">
              <img src={logo} className="App-logo" alt="logo" draggable={false} />
            </DraggableNode>
            <DraggableNode id="test-text" containerId="test">
              <h1 className="App-title">Welcome to React</h1>
            </DraggableNode>
          </header>
        </DragContainer>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}
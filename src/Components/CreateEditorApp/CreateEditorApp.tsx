import * as React from 'react';
import './CreateEditorApp.css';
import { Sidebar } from '../Sidebar';
import { CanvasArea } from '../CanvasArea';
import { deppCloneNaive, CanvasTextNode } from '../../Helpers';

interface CreateEditorAppState {
  text: {
    [nodeId: string]: CanvasTextNode;
  };
}

export class CreateEditorApp extends React.Component<{}, CreateEditorAppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      text: {}
    };

    this.addOrUpdateTextNode = this.addOrUpdateTextNode.bind(this);
  }

  addOrUpdateTextNode(nodeId: string, textNode: CanvasTextNode): void {
    this.setState((prevState) => {
      const newState = deppCloneNaive(prevState as CreateEditorAppState);
      newState.text[nodeId] = textNode;

      return newState;
    });
  }

  render() {
    return (
      <div className="create-editor-app">
        <Sidebar addTextNode={this.addOrUpdateTextNode} />
        <CanvasArea nodes={this.state}/>
      </div>
    );
  }
}
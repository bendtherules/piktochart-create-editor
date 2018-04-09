import * as React from 'react';
import './CreateEditorApp.css';
import { Sidebar } from '../Sidebar';
import { CanvasArea } from '../CanvasArea';
import { deppCloneNaive, CanvasTextNode, CanvasImageNode } from '../../Helpers';

interface CreateEditorAppState {
  imageURLs: string[];

  text: {
    [nodeId: string]: CanvasTextNode;
  };

  image: {
    [nodeId: string]: CanvasImageNode;
  };
}

export class CreateEditorApp extends React.Component<{}, CreateEditorAppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      imageURLs: [],
      text: {},
      image: {},
    };

    this.addOrUpdateTextNode = this.addOrUpdateTextNode.bind(this);
    this.addOrUpdateImageNode = this.addOrUpdateImageNode.bind(this);
    this.onImageUploadSuccess = this.onImageUploadSuccess.bind(this);
  }

  componentDidMount() {
    this.fetchImages();
  }

  onImageUploadSuccess() {
    this.fetchImages();
  }

  fetchImages() {
    fetch('http://localhost:8000/images/')
      .then((response: Response) => {
        return response.json();
      }).then((responseJSON: string[]) => {
        this.setState({
          imageURLs: responseJSON
        });
      }).catch((error) => {
        // tslint:disable-next-line:no-console
        console.error('Error loading image info:', error);
      });

  }

  addOrUpdateTextNode(nodeId: string, textNode: CanvasTextNode): void {
    this.setState((prevState) => {
      const newState = deppCloneNaive(prevState as CreateEditorAppState);
      newState.text[nodeId] = textNode;

      return newState;
    });
  }

  addOrUpdateImageNode(nodeId: string, imageNode: CanvasImageNode): void {
    this.setState((prevState) => {
      const newState = deppCloneNaive(prevState as CreateEditorAppState);
      newState.image[nodeId] = imageNode;

      return newState;
    });
  }

  render() {
    return (
      <div className="create-editor-app">
        <Sidebar
          imageURLs={this.state.imageURLs}
          notifyImageUploadSuccess={this.onImageUploadSuccess}
          addTextNode={this.addOrUpdateTextNode}
          addImageNode={this.addOrUpdateImageNode}
        />
        <CanvasArea nodes={this.state} />
      </div>
    );
  }
}
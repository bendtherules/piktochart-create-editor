import * as React from 'react';
import './CreateEditorApp.css';
import { Sidebar } from '../Sidebar';
import { CanvasArea } from '../CanvasArea';
import { deepCloneNaive, CanvasTextNode, CanvasImageNode, serverURL } from '../../Helpers';

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
  localStorageKey: string = 'appData';

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
    this.deleteNode = this.deleteNode.bind(this);
  }

  componentDidMount() {
    this.loadFromLocalStorage();
    this.fetchImages();
  }

  onImageUploadSuccess() {
    this.fetchImages();
  }

  fetchImages() {
    fetch(`${serverURL}/images/`)
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

  componentDidUpdate() {
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const stateJSON = JSON.stringify(this.state);
    localStorage.setItem(this.localStorageKey, stateJSON);
  }

  loadFromLocalStorage() {
    const stateJSON = localStorage.getItem(this.localStorageKey);

    if (stateJSON) {
      const stateObject = JSON.parse(stateJSON);
      this.setState(stateObject);
    }
  }

  addOrUpdateTextNode(nodeId: string, textNode: CanvasTextNode): void {
    this.setState((prevState) => {
      const newState = deepCloneNaive(prevState as CreateEditorAppState);
      newState.text[nodeId] = textNode;

      return newState;
    });
  }

  addOrUpdateImageNode(nodeId: string, imageNode: CanvasImageNode): void {
    this.setState((prevState) => {
      const newState = deepCloneNaive(prevState as CreateEditorAppState);
      newState.image[nodeId] = imageNode;

      return newState;
    });
  }

  deleteNode(type: 'text' | 'image', nodeId: string): void {
    this.setState((prevState) => {
      const newState = deepCloneNaive(prevState as CreateEditorAppState);

      if (type === 'text') {
        delete newState.text[nodeId];
      }
      if (type === 'image') {
        delete newState.image[nodeId];
      }

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
        <CanvasArea nodes={this.state} deleteNode={this.deleteNode} />
      </div>
    );
  }
}
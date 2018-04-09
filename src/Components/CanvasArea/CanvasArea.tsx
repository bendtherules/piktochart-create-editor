import * as React from 'react';
import * as uuid from 'uuid/v4';
import './CanvasArea.css';
import { CanvasTextNode } from '../../Helpers';
import { DragContainer } from '../DragContainer';
import { DraggableNode } from '../DraggableNode';

interface CanvasAreaProps {
    nodes: {
        text: {
            [nodeId: string]: CanvasTextNode;
        }
    };
}
interface CanvasAreaState {
}

export class CanvasArea extends React.Component<CanvasAreaProps, CanvasAreaState> {
    containerId: string;

    constructor(props: CanvasAreaProps) {
        super(props);

        this.containerId = 'container-' + uuid();
    }

    renderDraggableNodes() {
        return Object.keys(this.props.nodes.text).map((nodeId) => {
            const tmpTextNode = this.props.nodes.text[nodeId];
            return (
                <DraggableNode key={nodeId} id={nodeId} containerId={this.containerId}>
                    {tmpTextNode.value}
                </DraggableNode>
            );
        });
    }

    render() {
        return (
            <div className="canvas-area">
                <DragContainer id={this.containerId} >
                    <div className="drag-container-inner" style={{ width: '500px', height: '500px' }}>
                        {
                            this.renderDraggableNodes()
                        }
                    </div>
                </DragContainer>
            </div>
            // <DragContainer id="test">
            //   <header className="App-header">
            //     <DraggableNode id="test-img" containerId="test">
            //       <img src={logo} className="App-logo" alt="logo" draggable={false} />
            //     </DraggableNode>
            //     <DraggableNode id="test-text" containerId="test">
            //       <h1 className="App-title">Welcome to React</h1>
            //     </DraggableNode>
            //   </header>
            // </DragContainer>
            // <p className="App-intro">
            //   To get started, edit <code>src/App.tsx</code> and save to reload.
            // </p>
        );
    }
}
import * as React from 'react';
import * as uuid from 'uuid/v4';
import './CanvasArea.css';
import { CanvasTextNode, CanvasImageNode } from '../../Helpers';
import { DragContainer } from '../DragContainer';
import { DraggableNode } from '../DraggableNode';

interface CanvasAreaProps {
    nodes: {
        text: {
            [nodeId: string]: CanvasTextNode;
        }
        image: {
            [nodeId: string]: CanvasImageNode;
        };
    };

    deleteNode(type: 'text' | 'image', nodeId: string): void;
}
interface CanvasAreaState {
}

export class CanvasArea extends React.Component<CanvasAreaProps, CanvasAreaState> {
    containerId: string;

    constructor(props: CanvasAreaProps) {
        super(props);

        this.containerId = 'container-' + uuid();
    }

    renderDeleteNode(type: 'text' | 'image', nodeId: string) {
        return (
            <div className="delete" onClick={() => { this.props.deleteNode(type, nodeId); }}>
                <div className="delete-text">
                    X
                </div>
            </div>
        );
    }

    renderTextNodes() {
        return Object.keys(this.props.nodes.text).map((nodeId) => {
            const tmpTextNode = this.props.nodes.text[nodeId];
            return (
                <DraggableNode key={nodeId} id={nodeId} containerId={this.containerId}>
                    <div className="text-node">
                        {this.renderDeleteNode('text', nodeId)}
                        <div className="value">
                            {tmpTextNode.value}
                        </div>
                    </div>
                </DraggableNode>
            );
        });
    }

    renderImageNodes() {
        return Object.keys(this.props.nodes.image).map((nodeId) => {
            const tmpImageNode = this.props.nodes.image[nodeId];
            return (
                <DraggableNode key={nodeId} id={nodeId} containerId={this.containerId}>
                    <div className="image-node">
                        {this.renderDeleteNode('image', nodeId)}
                        <img draggable={false} src={tmpImageNode.url} />
                    </div>
                </DraggableNode>
            );
        });
    }

    renderDraggableNodes() {
        return (
            <React.Fragment>
                {this.renderTextNodes()}
                {this.renderImageNodes()}
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className="canvas-area col-sm-8 col-md-8 col-lg-8">
                <DragContainer id={this.containerId} >
                    <div className="block">
                        {
                            this.renderDraggableNodes()
                        }
                    </div>
                </DragContainer>
            </div>
        );
    }
}
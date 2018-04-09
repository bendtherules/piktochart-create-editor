import * as React from 'react';
import './DraggableNode.css';
import { DragContextProvider, DragSharedInfo, XYPair } from '../../Helpers';

interface DraggableNodeProps extends React.HTMLProps<HTMLDivElement> {
    id: string;
    containerId: string;
}

export class DraggableNode extends React.Component<DraggableNodeProps, {}> {

    calculateTransform(offset: XYPair) {
        return { transform: `translate(${offset.x}px, ${offset.y}px)` };
    }

    getContext(): React.Context<DragSharedInfo | undefined> {
        return DragContextProvider.get(this.props.containerId);
    }

    renderChildren(dragSharedInfo: DragSharedInfo | undefined): JSX.Element {
        if (typeof dragSharedInfo === 'undefined') {
            throw new TypeError('Context provider (DragContainer) absent in current JSX tree');
        }

        const wrappedDragStartHandler = ((ev: React.MouseEvent<HTMLDivElement>) => {
            dragSharedInfo.dragStartHandler(this.props.id, ev);
        });

        const offsetForThisNode: XYPair = (dragSharedInfo.offsetMap[this.props.id] || { x: 0, y: 0 });
        const tmpTransform = this.calculateTransform(offsetForThisNode);

        return (
            <div className="draggable-node" style={tmpTransform} onMouseDown={wrappedDragStartHandler}>
                {this.props.children}
            </div>
        );
    }

    render() {
        const CustomConsumer = this.getContext().Consumer;

        return (
            <CustomConsumer>
                {
                    (dragSharedInfo) => {
                        return this.renderChildren(dragSharedInfo);
                    }
                }
            </CustomConsumer>
        );
    }
}
import * as React from 'react';
import * as classNames from 'classnames';
import './DragContainer.css';
import { DragContextProvider, DragSharedInfo, XYPair } from '../../Helpers';

interface DragContainerProps {
    id: string;
}

type TotalOffset = XYPair;

interface DragContainerState {
    ongoing: {
        dragging: boolean;
        draggableId: string | undefined;
        startMousePosition: XYPair | undefined;
        currentMousePosition: XYPair | undefined;
    };
    pastCumulativeOffsetMap: {
        [draggableId: string]: TotalOffset
    };
}

export class DragContainer extends React.Component<DragContainerProps, DragContainerState> {
    constructor(props: DragContainerProps) {
        super(props);

        this.state = {
            ongoing: {
                dragging: false,
                draggableId: undefined,
                startMousePosition: undefined,
                currentMousePosition: undefined,
            },
            pastCumulativeOffsetMap: {

            }
        };

        this.handleDragStartOnDraggableNode = this.handleDragStartOnDraggableNode.bind(this);
        this.handleDragMove = this.handleDragMove.bind(this);
        this.handleDragStop = this.handleDragStop.bind(this);
    }

    handleDragStartOnDraggableNode(draggableId: string, ev: React.MouseEvent<HTMLDivElement>): void {
        this.setState({
            ongoing: {
                dragging: true,
                draggableId: draggableId,
                startMousePosition: { x: ev.clientX, y: ev.clientY },
                currentMousePosition: { x: ev.clientX, y: ev.clientY },
            }
        });
    }

    handleDragMove(ev: React.MouseEvent<HTMLDivElement>) {
        if (this.state.ongoing.dragging) {
            const oldStateOngoing = this.state.ongoing;

            let newStateOngoing = Object.assign({}, oldStateOngoing);
            newStateOngoing.currentMousePosition = {
                x: ev.clientX,
                y: ev.clientY
            };

            this.setState({
                ongoing: newStateOngoing
            });
        }
    }

    handleDragStop(ev: React.MouseEvent<HTMLDivElement>) {
        if (this.state.ongoing.dragging) {
            const oldState = this.state;
            const draggableId = oldState.ongoing.draggableId as string;
            const oldStateStartMousePosition = oldState.ongoing.startMousePosition as XYPair;
            const pastCumulativeOffset = oldState.pastCumulativeOffsetMap[draggableId] || { x: 0, y: 0 };

            let newState: DragContainerState = Object.assign({}, oldState);
            newState.ongoing = {
                dragging: false,
                draggableId: undefined,
                currentMousePosition: undefined,
                startMousePosition: undefined
            };

            newState.pastCumulativeOffsetMap[draggableId] = {
                x: pastCumulativeOffset.x + (ev.clientX - oldStateStartMousePosition.x),
                y: pastCumulativeOffset.y + (ev.clientY - oldStateStartMousePosition.y),
            };

            this.setState(newState);
        }
    }

    getContext(): React.Context<DragSharedInfo | undefined> {
        return DragContextProvider.get(this.props.id);
    }
    // FIX DragSharedInfo providing by using draggableID map
    getCurrentOffsetMap() {
        const stateOngoing = this.state.ongoing;
        const lastOffsetMap = this.state.pastCumulativeOffsetMap;

        if (stateOngoing.dragging) {
            const startMousePosition = stateOngoing.startMousePosition as XYPair;
            const currentMousePosition = stateOngoing.currentMousePosition as XYPair;
            const draggableId = stateOngoing.draggableId as string;
            const lastOffsetForCurrentDraggableId = lastOffsetMap[draggableId] || { x: 0, y: 0 };

            let newOffsetMap = Object.assign({}, lastOffsetMap);

            newOffsetMap[draggableId] = {
                x: lastOffsetForCurrentDraggableId.x + (currentMousePosition.x - startMousePosition.x),
                y: lastOffsetForCurrentDraggableId.y + (currentMousePosition.y - startMousePosition.y),
            };

            return newOffsetMap;
        } else {
            return lastOffsetMap;
        }

    }

    render() {
        const CustomProvider = this.getContext().Provider;
        const currentOffsetMap = this.getCurrentOffsetMap();

        const providerValue: DragSharedInfo = {
            dragStartHandler: this.handleDragStartOnDraggableNode,
            offsetMap: currentOffsetMap
        };

        const defaultClassName = 'drag-container';
        const classNamesArray = [defaultClassName];
        if (this.state.ongoing.dragging) {
            classNamesArray.push('dragging');
        }

        return (
            <CustomProvider value={providerValue}>
                <div
                    className={classNames(classNamesArray)}
                    onMouseMove={this.handleDragMove}
                    onMouseUp={this.handleDragStop}
                    // tslint:disable-next-line:no-console
                    onFocus={() => { console.log('focus'); }}
                    // tslint:disable-next-line:no-console
                    onBlur={() => { console.log('blur'); }}
                >
                    {this.props.children}
                </div>
            </CustomProvider >
        );
    }
}
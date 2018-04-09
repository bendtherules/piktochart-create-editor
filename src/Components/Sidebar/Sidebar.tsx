import * as React from 'react';
import './Sidebar.css';
import { UploadResourcesInput } from '../UploadResourcesInput';
import { AddToCanvasInput } from '../AddToCanvasInput';
import { CanvasTextNode, CanvasImageNode } from '../../Helpers';

interface SidebarProps {
    addTextNode(nodeId: string, textNode: CanvasTextNode): void;
    addImageNode(nodeId: string, imgNode: CanvasImageNode): void;
}

interface SidebarState {
}

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar col-sm-2 col-md-2 col-lg-2">
                <UploadResourcesInput />
                <AddToCanvasInput addTextNode={this.props.addTextNode} addImageNode={this.props.addImageNode} />
            </div>

        );
    }
}
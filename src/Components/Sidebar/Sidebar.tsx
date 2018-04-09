import * as React from 'react';
import './Sidebar.css';
import { UploadResourcesInput } from '../UploadResourcesInput';
import { AddToCanvasInput } from '../AddToCanvasInput';
import { CanvasTextNode } from '../../Helpers';

interface SidebarProps {
    addTextNode(nodeId: string, textNode: CanvasTextNode): void;
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

                <div className="assets">
                    <h3>Assets</h3>
                    <div className="text">
                        <AddToCanvasInput addTextNode={this.props.addTextNode} />
                        
                    </div>
                    <div className="image">
                        <h4>Images</h4>
                        <ul className="list-unstyled">
                            {/* List of images here 
                            <li><img src="images/sample.jpeg" class="img-rounded" /></li>  */}
                        </ul>
                    </div>
                </div>

            </div>

        );
    }
}
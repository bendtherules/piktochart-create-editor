import * as React from 'react';
import * as uuid from 'uuid/v4';
import './AddToCanvasInput.css';
import { CanvasTextNode } from '../../Helpers';

interface AddToCanvasInputProps {
    addTextNode(nodeId: string, textNode: CanvasTextNode): void;
}

interface AddToCanvasInputState {
    textInputValue: string;
}

export class AddToCanvasInput extends React.Component<AddToCanvasInputProps, AddToCanvasInputState> {
    constructor(props: AddToCanvasInputProps) {
        super(props);

        this.state = {
            textInputValue: ''
        };

        this.updateInputText = this.updateInputText.bind(this);
        this.addTextNodeOnSubmit = this.addTextNodeOnSubmit.bind(this);
    }

    updateInputText(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            textInputValue: ev.target.value
        });
    }

    addTextNodeOnSubmit() {
        if (this.state.textInputValue.trim() !== '') {
            const nodeId = uuid();

            this.props.addTextNode(nodeId, {
                value: this.state.textInputValue,
                position: { x: 0, y: 0 }
            });

            this.setState({
                textInputValue: ''
            });
        }
    }

    render() {
        return (
            <div className="add-to-canvas-input">
                <div className="assets">
                    <h3>Assets</h3>
                    <div className="text">
                        <h4>Text</h4>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.textInputValue}
                            onChange={this.updateInputText}
                        />
                        <button id="addText" className="btn btn-default" onClick={this.addTextNodeOnSubmit} >
                            Add Text
                    </button>
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
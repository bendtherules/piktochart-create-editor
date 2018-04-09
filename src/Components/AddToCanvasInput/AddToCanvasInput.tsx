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
                <div className="add-text-input">
                    <div className="desc">
                        Add text
                    </div>
                    <input type="text" value={this.state.textInputValue} onChange={this.updateInputText} />
                    <input type="button" value="Add" onClick={this.addTextNodeOnSubmit} />
                </div>
            </div>
        );
    }
}
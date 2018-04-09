import * as React from 'react';
import * as uuid from 'uuid/v4';
import './AddToCanvasInput.css';
import { CanvasTextNode, CanvasImageNode } from '../../Helpers';

interface AddToCanvasInputProps {
    addTextNode(nodeId: string, textNode: CanvasTextNode): void;
    addImageNode(nodeId: string, imgNode: CanvasImageNode): void;
}

interface AddToCanvasInputState {
    textInputValue: string;
    imageURLs: string[];
}

export class AddToCanvasInput extends React.Component<AddToCanvasInputProps, AddToCanvasInputState> {
    constructor(props: AddToCanvasInputProps) {
        super(props);

        this.state = {
            textInputValue: '',
            imageURLs: []
        };

        this.updateInputText = this.updateInputText.bind(this);
        this.addTextNodeOnSubmit = this.addTextNodeOnSubmit.bind(this);
        this.addImageNodeOnSubmit = this.addImageNodeOnSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchImages();
    }

    fetchImages() {
        fetch('http://localhost:8000/images/')
            .then((response: Response) => {
                return response.json();
            })
            .then((responseJSON: string[]) => {
                this.setState({
                    imageURLs: responseJSON
                });
            })
            // tslint:disable-next-line:no-console
            .catch(error => console.error('Error loading image info:', error));

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

    addImageNodeOnSubmit(ev: React.MouseEvent<HTMLImageElement>) {
        const imageURL = ev.currentTarget.src;
        const nodeId = uuid();

        this.props.addImageNode(nodeId, {
            url: imageURL,
            position: { x: 0, y: 0 }
        });
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
                            {
                                this.state.imageURLs.map((imgURL) => {
                                    return (
                                        <li key={imgURL}>
                                            <img
                                                src={imgURL}
                                                className="img-rounded"
                                                onClick={this.addImageNodeOnSubmit}
                                            />
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
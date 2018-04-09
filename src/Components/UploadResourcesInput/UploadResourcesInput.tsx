import * as React from 'react';
import './UploadResourcesInput.css';

interface UploadResourcesInputProps {
    notifyImageUploadSuccess(): void;
}

interface UploadResourcesInputState {
    file: File | undefined;
}

export class UploadResourcesInput extends React.Component<UploadResourcesInputProps, UploadResourcesInputState> {
    constructor(props: UploadResourcesInputProps) {
        super(props);

        this.state = {
            file: undefined
        };

        this.onFileChange = this.onFileChange.bind(this);
        this.onFileSubmit = this.onFileSubmit.bind(this);
    }

    onFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
        if (ev.target.files && ev.target.files.length > 0) {
            this.setState({ file: ev.target.files[0] });
        }
    }

    onFileSubmit(ev: React.MouseEvent<HTMLButtonElement>) {
        if (this.state.file !== undefined) {
            const url = 'http://localhost:8000/uploads';
            const formData = new FormData();
            formData.append('upload', this.state.file);

            fetch(url, {
                method: 'POST',
                body: formData
            }).then((response: Response) => {

                return response.json();

            }).then((responseJson: { message?: string, file?: string }) => {

                // tslint:disable-next-line:no-console
                if (responseJson.file) {
                    this.props.notifyImageUploadSuccess();

                    // tslint:disable-next-line:no-console
                    console.log('File uploaded: ' + responseJson.file);

                } else if (responseJson.message) {

                    console.warn('Error during file upload: ' + responseJson.message);

                }

            });
        }
    }

    render() {
        return (
            <div className="form">
                <h3>Form</h3>
                <input
                    type="file"
                    className="form-control"
                    placeholder="Upload Your Images"
                    name="upload"
                    onChange={this.onFileChange}
                />
                <button id="submit" className="btn btn-default" onClick={this.onFileSubmit}>upload</button>
            </div>
        );
    }
}
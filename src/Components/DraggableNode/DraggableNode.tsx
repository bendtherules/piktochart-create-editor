import * as React from 'react';

interface OnClickProps {
    onClick(event: React.MouseEvent<HTMLDivElement>): void;
}

export class DraggableNode extends React.Component {
    getModifiedChildrenWithAddedClickHandler(): React.ReactElement<OnClickProps>[] {
        return React.Children.map(this.props.children, (eachChild) => {
            // tslint:disable-next-line:no-console
            return React.cloneElement(
                eachChild as React.ReactElement<OnClickProps>,
                {
                    onClick: function (event: React.MouseEvent<HTMLDivElement>) {
                        // tslint:disable-next-line:no-console
                        console.log(arguments);
                    }
                });
        });
    }

    render() {
        return this.getModifiedChildrenWithAddedClickHandler();
    }
}
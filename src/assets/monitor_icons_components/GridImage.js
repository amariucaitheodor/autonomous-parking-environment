import React from 'react';
import { Image } from "react-konva";

export default class GridImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: new window.Image()
        }
    }

    componentDidMount() {
        let newImage = this.state.image;
        newImage.src = this.props.url;
        newImage.onload = () => {
            // need to update layer manually
            this.imageNode.getLayer().batchDraw();
        };
        this.setState({ image: newImage });
    }

    render() {
        return (
            <Image
                x={this.props.x}
                y={this.props.y}
                width={this.props.width}
                height={this.props.height}
                image={this.state.image}
                visible={this.props.occupied !== undefined ? true : this.props.occupied}
                listening={this.props.listening !== undefined ? true : this.props.listening}
                shadowBlur={5}
            />
        );
    }
}
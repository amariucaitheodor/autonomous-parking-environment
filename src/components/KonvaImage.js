import React from 'react';
import { Image } from "react-konva";
import PropTypes from 'prop-types';

export default class KonvaImage extends React.PureComponent {
  
// https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/images
  state = {
    image: null
  };

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };

  static whyDidYouRender = true
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        image={this.state.image}
        visible={this.props.visible !== undefined ? this.props.visible : true}
        listening={this.props.listening !== undefined ? this.props.listening : true}
        shadowBlur={this.props.shadowBlur !== undefined ? this.props.shadowBlur : 5}
      />
    );
  }
}

KonvaImage.propTypes = {
  src: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
import React from 'react';
import { Image } from "react-konva";
import PropTypes from 'prop-types';

export default class GridImage extends React.Component {
  state = {
    image: null
  };

  static propTypes = {
    src: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.src;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

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
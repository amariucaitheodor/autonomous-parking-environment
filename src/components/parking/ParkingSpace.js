import React from "react";
import PropTypes from 'prop-types';
import { Rect, Text, Group } from "react-konva";

function ParkingSpace({ x, y, width, height, available, id }) {
    return (
        <Group>
            <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                fillRadialGradientStartPoint={{ x: width / 2, y: height / 2 }}
                fillRadialGradientEndPoint={{ x: width / 2, y: height / 2 }}
                fillRadialGradientStartRadius={width > height ? height : width}
                fillRadialGradientColorStops={
                    available ?
                        [0, "rgba(63,145,60)", 1, "rgba(103,233,98)"] :
                        [0, "rgba(141,38,38)", 1, "rgba(230,67,67)"]
                }
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={3}
            />
            <Text
                x={x + width / 2 - 5}
                y={y + height / 2 - 10}
                text={id}
                fontSize={20}
            />
        </Group>
    );
}

ParkingSpace.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired
};

export default ParkingSpace;

// import React from "react";
// import { Text } from "react-konva";

// class SpaceStatus extends React.Component {
//   constructor() {
//     super();
//     this.state = { status: "UNLOADING" };
//   }

//   componentDidMount() {
//     this.interval = setInterval(() => this.setState(
//       { status: this.state.status === "UNLOADING" ? "LOADING" : "UNLOADING" }
//     ), 1000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }

//   render() {
//     return (
//       <Text
//         x={45}
//         y={10}
//         text={this.state.status}
//         fontSize={20}
//       />);
//   }
// }

// export default SpaceStatus;

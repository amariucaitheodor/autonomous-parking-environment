import React from "react";
import PropTypes from 'prop-types';
import { Arrow } from "react-konva";

function RobotPath({ robotPath, parkingLotOffset, gridCellSize }) {
    let pathStop = [];
    robotPath.forEach(element => {
        let xCoord =
            parkingLotOffset.x +
            element.column * gridCellSize.width +
            gridCellSize.width / 2
            ;
        let yCoord =
            parkingLotOffset.y +
            element.row * gridCellSize.height +
            gridCellSize.height / 2
            ;
        pathStop.push(xCoord);
        pathStop.push(yCoord);
    });

    return (<>{
        < Arrow
            points={pathStop}
            shadowBlur={0.5}
            stroke={"black"}
            strokeWidth={1.7}
        />}</>
    );
}

RobotPath.propTypes = {
    robotPath: PropTypes.array.isRequired,
    parkingLotOffset: PropTypes.object.isRequired,
    gridCellSize: PropTypes.object.isRequired
};

export default RobotPath;

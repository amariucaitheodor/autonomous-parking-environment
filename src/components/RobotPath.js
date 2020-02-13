import React from "react";
import PropTypes from 'prop-types';
import { Arrow } from "react-konva";

function DebugPath({ robotPath, parkingLotOffset, debugGridCellSize }) {
    let pathStop = [];
    robotPath.forEach(element => {
        let xCoord =
            parkingLotOffset.x +
            element.i * debugGridCellSize.width +
            debugGridCellSize.width / 2
            ;
        let yCoord =
            parkingLotOffset.y +
            element.j * debugGridCellSize.height +
            debugGridCellSize.height / 2
            ;
        pathStop.push(xCoord);
        pathStop.push(yCoord);
    });

    return (<>{
        < Arrow
            points={pathStop}
            shadowBlur={3}
            stroke={"black"}
            strokeWidth={1.7}
        />}</>
    );
}

DebugPath.propTypes = {
    robotPath: PropTypes.array.isRequired,
    parkingLotOffset: PropTypes.object.isRequired,
    debugGridCellSize: PropTypes.object.isRequired
};

export default DebugPath;

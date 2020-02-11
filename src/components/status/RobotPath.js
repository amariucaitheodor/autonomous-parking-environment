import React from "react";
import { Arrow } from "react-konva";

function DebugPath(props) {
    let pathStop = [];
    props.robotPath.forEach(element => {
        let xCoord =
            props.parkingLotOffset.x +
            element.i * props.debugGridCellSize.width +
            props.debugGridCellSize.width / 2
            ;
        let yCoord =
            props.parkingLotOffset.y +
            element.j * props.debugGridCellSize.height +
            props.debugGridCellSize.height / 2
            ;
        pathStop.push(xCoord);
        pathStop.push(yCoord);
    });

    return (<>{
        < Arrow
            points={pathStop}
            shadowBlur={3}
            stroke={"black"}
            strokeWidth={1.5}
        />}</>
    );
}

export default DebugPath;

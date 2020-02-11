import React from "react";
import { Rect } from "react-konva";

function DebugGrid(props) {
    let pddlCells = [], i, j;
    for (i = 0; i < props.debugGridDimensions.columns; i++)
        for (j = 0; j < props.debugGridDimensions.rows; j++) {
            let uniqueId = j + props.debugGridDimensions.rows * i;

            let xCoord = props.parkingLotOffset.x + i * props.debugGridCellSize.width;
            let yCoord = props.parkingLotOffset.y + j * props.debugGridCellSize.height;

            let cellType = props.debugCellTypes.road;

            if (xCoord < props.parkingLotOffset.x + props.upperLeftSquareSide &&
                props.parkingLotOffset.y + yCoord < props.upperLeftSquareSide)
                cellType = props.debugCellTypes.blockingSpace;

            let ih =i, ij =j;
            props.parkingPointers.forEach(parkingPointer => {
                if (parkingPointer.i === ih && parkingPointer.j === ij)
                    cellType = props.debugCellTypes.availableParking;
            });

            if (i === 0 && j === 5)
                cellType = props.debugCellTypes.carAwaitingPickup;

            if (i === 0 && j === 4)
                cellType = props.debugCellTypes.carAwaitingOwner;

            if (i === 0 && (j === 2 || j === 3))
                cellType = props.debugCellTypes.availableDropoff;

            pddlCells.push(
                <Rect
                    key={uniqueId}
                    x={xCoord}
                    y={yCoord}
                    width={props.debugGridCellSize.width}
                    height={props.debugGridCellSize.height}
                    fill={cellType}
                    shadowBlur={3}
                    stroke={"black"}
                    strokeWidth={0.5}
                />);
        }

    return (<>{pddlCells}</>);
}

export default DebugGrid;

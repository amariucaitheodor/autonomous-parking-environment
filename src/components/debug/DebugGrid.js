import React from "react";
import PropTypes from 'prop-types';
import { Rect } from "react-konva";

function DebugGrid({ debugGridDimensions, debugGridCellSize, debugCellTypes, upperLeftSquareSide, parkingLotOffset,parkingPointers }) {
    let pddlCells = [], i, j;
    for (i = 0; i < debugGridDimensions.columns; i++)
        for (j = 0; j < debugGridDimensions.rows; j++) {
            let uniqueId = j + debugGridDimensions.rows * i;

            let xCoord = parkingLotOffset.x + i * debugGridCellSize.width;
            let yCoord = parkingLotOffset.y + j * debugGridCellSize.height;

            let cellType = debugCellTypes.road;

            if (xCoord < parkingLotOffset.x + upperLeftSquareSide &&
                parkingLotOffset.y + yCoord < upperLeftSquareSide)
                cellType = debugCellTypes.blockingSpace;

            let ih =i, ij =j;
            parkingPointers.forEach(parkingPointer => {
                if (parkingPointer.i === ih && parkingPointer.j === ij)
                    cellType = debugCellTypes.availableParking;
            });

            if (i === 0 && j === 5)
                cellType = debugCellTypes.carAwaitingPickup;

            if (i === 0 && j === 4)
                cellType = debugCellTypes.carAwaitingOwner;

            if (i === 0 && (j === 2 || j === 3))
                cellType = debugCellTypes.availableDropoff;

            pddlCells.push(
                <Rect
                    key={uniqueId}
                    x={xCoord}
                    y={yCoord}
                    width={debugGridCellSize.width}
                    height={debugGridCellSize.height}
                    fill={cellType}
                    shadowBlur={3}
                    stroke={"black"}
                    strokeWidth={0.5}
                />);
        }

    return (<>{pddlCells}</>);
}

DebugGrid.propTypes = {
    debugGridDimensions: PropTypes.object.isRequired,
    debugGridCellSize: PropTypes.object.isRequired,
    debugCellTypes: PropTypes.object.isRequired, 
    upperLeftSquareSide: PropTypes.number.isRequired, 
    parkingLotOffset: PropTypes.object.isRequired,
    parkingPointers: PropTypes.array.isRequired
};

export default DebugGrid;

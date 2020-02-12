import React from "react";
import ParkingSpace from './ParkingSpace';
import PropTypes from 'prop-types';

function ParkingGroup({ horizontal, cellSize, slice, parkingPointers, offset }) {
    var width = horizontal ? cellSize.width : cellSize.height;
    var height = horizontal ? cellSize.height : cellSize.width;
    var groupSpaceIndex = slice[0];

    let pddlParkingCells = [];
    parkingPointers.forEach((parkingPointer) => {
        groupSpaceIndex++;
        pddlParkingCells.push(<ParkingSpace
            key={groupSpaceIndex}
            id={groupSpaceIndex}
            available={true}
            x={offset.x + 10 + width * (parkingPointer.i - 1)}
            y={offset.y + height * parkingPointer.j}
            width={width}
            height={height}
        />
        );
    });

    return (<>{pddlParkingCells}</>);
}

ParkingGroup.propTypes = {
    horizontal: PropTypes.bool.isRequired,
    cellSize: PropTypes.object.isRequired,
    slice: PropTypes.array.isRequired,
    parkingPointers: PropTypes.array.isRequired,
    offset: PropTypes.object.isRequired
};

export default ParkingGroup;

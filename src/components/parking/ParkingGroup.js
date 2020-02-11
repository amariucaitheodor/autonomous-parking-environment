import React from "react";
import ParkingSpace from './ParkingSpace';

function ParkingGroup(props) {
    var width = props.horizontal ? props.cellSize.width : props.cellSize.height;
    var height = props.horizontal ? props.cellSize.height : props.cellSize.width;
    var groupSpaceIndex = props.slice[0];

    let pddlParkingCells = [];
    props.parkingPointers.forEach((parkingPointer) => {
        groupSpaceIndex++;
        pddlParkingCells.push(<ParkingSpace
            key={groupSpaceIndex}
            id={groupSpaceIndex}
            available={true}
            x={props.offset.x + 10 + width * (parkingPointer.i - 1)}
            y={props.offset.y + height * parkingPointer.j}
            width={width}
            height={height}
        />
        );
    });

    return (<>{pddlParkingCells}</>);
}

export default ParkingGroup;

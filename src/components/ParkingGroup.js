import React from "react";
import ParkingSpace from './ParkingSpace';

function ParkingGroup(props) {
    return (
        <>
            {props.spacesAvailable.map((space, index) =>
                <ParkingSpace
                    key={index}
                    id={index} 
                    x={props.offset.x + 115 * index}
                    y={props.offset.y}// + 75 * index}
                    width={110}
                    height={60}
                />
            )}
        </>
    );
}

export default ParkingGroup;

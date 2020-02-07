import React from "react";
import ParkingSpace from './ParkingSpace';

function ParkingGroup(props) {
    return (
        <>
            {props.spacesAvailable.map((spaceIsAvailable, index) =>
                <ParkingSpace
                    key={index}
                    id={index}
                    available={spaceIsAvailable}
                    x={props.offset.x + 115 * (index % 5)}
                    y={props.offset.y + 65 * Math.floor(index / 5)}
                    width={110}
                    height={60}
                />
            )}
        </>
    );
}

export default ParkingGroup;

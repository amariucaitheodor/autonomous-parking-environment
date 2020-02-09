import React from "react";
import ParkingSpace from './ParkingSpace';

function ParkingGroup(props) {
    var width = props.horizontal ? 150 : 80, height = props.horizontal ? 80 : 150;
    var groupSpaceIndex = props.slice[0];

    return (
        <>
            {props.spaces.slice(props.slice[0], props.slice[1]).map((spaceIsAvailable, index) => {
                groupSpaceIndex++;
                return <ParkingSpace
                    key={groupSpaceIndex}
                    id={groupSpaceIndex}
                    available={spaceIsAvailable}
                    x={props.offset.x + (width + 3) * (index % props.columns)}
                    y={props.offset.y + (height + 3) * Math.floor(index / props.columns)}
                    width={width}
                    height={height}
                />
            }
            )}
        </>
    );
}

export default ParkingGroup;

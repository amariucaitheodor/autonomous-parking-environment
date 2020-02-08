import React from "react";
import { Rect, Text, Group } from "react-konva";

function ParkingSpace(props) {
    return (
        <Group>
            <Rect
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
                fillRadialGradientStartPoint={{ x: props.width / 2, y: props.height / 2 }}
                fillRadialGradientEndPoint={{ x: props.width / 2, y: props.height / 2 }}
                fillRadialGradientStartRadius={props.horizontal? props.height : props.width}
                fillRadialGradientColorStops={
                    props.available?
                    [0, "rgba(63,145,60)", 1, "rgba(103,233,98)"] : 
                    [0, "rgba(141,38,38)", 1, "rgba(230,67,67)"]
                }
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={3}
            />
            <Text
                x={props.x + props.width / 2 - 5}
                y={props.y + props.height / 2 - 10}
                text={props.id}
                fontSize={20}
            />
        </Group>
    );
}

export default ParkingSpace;

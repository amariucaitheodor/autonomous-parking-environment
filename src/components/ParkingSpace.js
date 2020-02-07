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
                fillRadialGradientStartRadius={props.height}
                fillRadialGradientColorStops={[
                    0,
                    "rgba(63,145,60)",
                    1,
                    "rgba(103,233,98)"
                ]}
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={3}
            />
            <Text
                x={props.x + props.width / 2 + 3}
                y={props.y + props.height / 2 + 3}
                text={props.id}
                fontSize={20}
            />
        </Group>
    );
}

export default ParkingSpace;

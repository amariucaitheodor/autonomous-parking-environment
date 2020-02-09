import React from "react";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import { Popover, OverlayTrigger, NavDropdown } from "react-bootstrap";

function PddlLegend(props) {
    const popover = <Popover id="popover-basic">
        <Popover.Title as="h3">Legend</Popover.Title>
        <Popover.Content>
            <Stage width={240} height={240}>
                <Layer>
                    <Group>
                        <Rect
                            x={5}
                            y={5}
                            width={30}
                            height={30}
                            fill={props.stringColors.red}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={10}
                            text={"Blocked space"}
                            fontSize={20}
                        />
                    </Group>
                    <Group>
                        <Rect
                            x={5}
                            y={45}
                            width={30}
                            height={30}
                            fill={props.stringColors.blue}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={50}
                            text={"Pickup/Dropoff Space"}
                            fontSize={20}
                        />
                    </Group>
                    <Group>
                        <Rect
                            x={5}
                            y={85}
                            width={30}
                            height={30}
                            fill={props.stringColors.green}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={90}
                            text={"Available Space"}
                            fontSize={20}
                        />
                    </Group>
                    <Group>
                        <Rect
                            x={5}
                            y={125}
                            width={30}
                            height={30}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={130}
                            text={"Road"}
                            fontSize={20}
                        />
                    </Group>
                    <Group>
                        <Rect
                            x={5}
                            y={165}
                            width={30}
                            height={30}
                            fill={props.stringColors.orange}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={170}
                            text={"Car waiting"}
                            fontSize={20}
                        />
                    </Group>
                    <Group>
                        <Rect
                            x={5}
                            y={205}
                            width={30}
                            height={30}
                            fill={props.stringColors.black}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={210}
                            text={"Robot location"}
                            fontSize={20}
                        />
                    </Group>
                </Layer>
            </Stage>
        </Popover.Content>
    </Popover>

    return (
        <OverlayTrigger
            placement="right"
            delay={{ show: 150, hide: 150 }}
            overlay={popover}
        >
            <NavDropdown.Item>Debug Legend</NavDropdown.Item>
        </OverlayTrigger>
    );
}

export default PddlLegend;

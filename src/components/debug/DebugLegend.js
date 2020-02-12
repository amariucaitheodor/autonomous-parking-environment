import React from "react";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import { Popover, OverlayTrigger, NavDropdown } from "react-bootstrap";

function PddlLegend({ debugCellTypes }) {
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
                            fill={debugCellTypes.blockingSpace}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={10}
                            text={"Blocking Space"}
                            fontSize={20}
                        />
                    </Group>
                    <Group>
                        <Rect
                            x={5}
                            y={45}
                            width={30}
                            height={30}
                            fill={debugCellTypes.road}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={50}
                            text={"Road"}
                            fontSize={20}
                        />
                    </Group>
                    <Group>
                        <Rect
                            x={5}
                            y={85}
                            width={30}
                            height={30}
                            fill={debugCellTypes.availableParking}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={90}
                            text={"Available Parking"}
                            fontSize={20}
                        />
                    </Group>
                    <Group>
                        <Rect
                            x={5}
                            y={125}
                            width={30}
                            height={30}
                            fill={debugCellTypes.availableDropoff}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={130}
                            text={"Available Dropoff"}
                            fontSize={20}
                        />
                    </Group>
                    <Group>
                        <Rect
                            x={5}
                            y={165}
                            width={30}
                            height={30}
                            fill={debugCellTypes.carAwaitingPickup}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={170}
                            text={"Car Awaiting Pickup"}
                            fontSize={20}
                        />
                    </Group>
                    <Group>
                        <Rect
                            x={5}
                            y={205}
                            width={30}
                            height={30}
                            fill={debugCellTypes.carAwaitingOwner}
                            shadowBlur={3}
                            stroke={"black"}
                            strokeWidth={0.5}
                        />
                        <Text
                            x={45}
                            y={210}
                            text={"Car Awaiting Owner"}
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

import React from "react";
import { Rect, Group, Text } from "react-konva";
import Portal from '../../Portal';
import { Button } from 'react-bootstrap';

function DebugTile({ mapTile, hasStatus, spacesAvailable, gridCellSize, debugName }) {

    const color = 'rgba(220, 220, 220, 0.8)'
    const statusButton = {
        position: 'absolute',
        background: color,
        top: mapTile.y * gridCellSize.height + gridCellSize.height * 1.1,
        left: mapTile.x * gridCellSize.width + gridCellSize.width / 13,
        width: gridCellSize.width * 0.95,
        height: gridCellSize.height / 4
    }
    const typeButton = {
        position: 'absolute',
        background: color,
        top: mapTile.y * gridCellSize.height + gridCellSize.height / 2,
        left: mapTile.x * gridCellSize.width + gridCellSize.width / 13,
        width: gridCellSize.width * 0.95,
        height: gridCellSize.height / 4
    }

    let portalButtonGroup;

    if (mapTile.type === "hub")
        portalButtonGroup = <Portal>
            <Button
                variant="light"
                style={typeButton}
            >
                {debugName}
            </Button>
            <Button
                variant="light"
                style={statusButton}
            >
                Available
            </Button>
        </Portal>;
    else if (mapTile.type === "parking")
        portalButtonGroup = <Portal>
            <Button
                variant="light"
                style={typeButton}
            >
                {debugName}
            </Button>
            <Button
                variant="light"
                style={statusButton}
            >
                Available parking
            </Button>
        </Portal>;
    else
        portalButtonGroup = <Portal>
            <Button
                variant="light"
                style={typeButton}
            >
                {debugName}
            </Button>
        </Portal>;

    return (
        <Group>
            <Rect
                x={mapTile.x * gridCellSize.width}
                y={mapTile.y * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fill={"rgba(255, 255, 255, 0.3)"}
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={3}
            />
            {/* {portalButtonGroup} */}
            <Text
                x={mapTile.x * gridCellSize.width + gridCellSize.width / 15}
                y={mapTile.y * gridCellSize.height + gridCellSize.height / 12}
                text={"R" + mapTile.y + "C" + mapTile.x + " (" + debugName + ")"}
                fontSize={20}
            />
            <Text
                x={mapTile.x * gridCellSize.width + gridCellSize.width / 15}
                y={mapTile.y * gridCellSize.height + gridCellSize.height / 1.25}
                text={hasStatus ?
                    "Status: " +
                    (mapTile.type === "hub" ?
                        (spacesAvailable.includes("R" + mapTile.y + "C" + mapTile.x) ?
                            "Available" : "Awaiting Parking") :
                        (mapTile.type === "parking" ?
                            (spacesAvailable.includes("R" + mapTile.y + "C" + mapTile.x) ?
                                "Available" : "Occupied") :
                            null)) :
                    null
                }
                fontSize={20}
            />
        </Group>
    );
}

export default DebugTile;

import React from "react";
import { Rect, Group, Text } from "react-konva";

function DebugTile({ mapTile, spacesAvailable, gridCellSize, debugName, hasStatus }) {
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

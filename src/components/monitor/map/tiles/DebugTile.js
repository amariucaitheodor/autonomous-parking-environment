import React from "react";
import { Rect, Text } from "react-konva";

function DebugTile({ tinyMap, visualGridOffset, tile, row, col, gridCellSize, debugName }) {
    // We pass visualGridOffset to the tiles to eliminate nesting and thus be able to run in FastLayer
    return (
        <>
            <Rect
                x={visualGridOffset.x + col * gridCellSize.width}
                y={visualGridOffset.y + row * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fill={"rgba(255, 255, 255, 0.35)"}
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={2}
            />
            <Text
                x={visualGridOffset.x + col * gridCellSize.width + gridCellSize.width / 15}
                y={visualGridOffset.y + row * gridCellSize.height + gridCellSize.height / 12}
                text={`R${row}C${col}`}
                fontSize={20}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
            <Text
                x={visualGridOffset.x + col * gridCellSize.width + gridCellSize.width / 16}
                y={visualGridOffset.y + row * gridCellSize.height + gridCellSize.height / (tinyMap ? 3 : 3.5)}
                text={`(${debugName})`}
                fontSize={tinyMap ? 14 : 18}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
            <Text
                x={visualGridOffset.x + col * gridCellSize.width + gridCellSize.width / 15}
                y={visualGridOffset.y + row * gridCellSize.height + gridCellSize.height / 1.25}
                text={tile.car === undefined ? null : `License: ${tile.car.license}`}
                fontSize={tinyMap ? 14 : 18}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
            <Text
                x={visualGridOffset.x + col * gridCellSize.width + gridCellSize.width / 15}
                y={visualGridOffset.y + row * gridCellSize.height + gridCellSize.height / 1.6}
                text={tile.car === undefined ? null : tile.car.status.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}
                fontSize={tinyMap ? 14 : 18}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
        </>
    );
}

export default DebugTile;

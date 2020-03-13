import React from "react";
import { Rect, Text } from "react-konva";

function DebugTile({ parkingLotOffset, tile, row, col, gridCellSize, debugName }) {
    // We pass parkingLotOffset to the tiles to eliminate nesting and thus be able to run in FastLayer
    return (
        <>
            <Rect
                x={parkingLotOffset.x + col * gridCellSize.width}
                y={parkingLotOffset.y + row * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fill={"rgba(255, 255, 255, 0.35)"}
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={2}
            />
            <Text
                x={parkingLotOffset.x + col * gridCellSize.width + gridCellSize.width / 15}
                y={parkingLotOffset.y + row * gridCellSize.height + gridCellSize.height / 12}
                text={`R${row}C${col}`}
                fontSize={20}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
            <Text
                x={parkingLotOffset.x + col * gridCellSize.width + gridCellSize.width / 16}
                y={parkingLotOffset.y + row * gridCellSize.height + gridCellSize.height / 3.5}
                text={`(${debugName})`}
                fontSize={18}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
            <Text
                x={parkingLotOffset.x + col * gridCellSize.width + gridCellSize.width / 15}
                y={parkingLotOffset.y + row * gridCellSize.height + gridCellSize.height / 1.25}
                text={tile.car === undefined? null : `License: ${tile.car.license}`}
                fontSize={18}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
            <Text
                x={parkingLotOffset.x + col * gridCellSize.width + gridCellSize.width / 15}
                y={parkingLotOffset.y + row * gridCellSize.height + gridCellSize.height / 1.55}
                text={tile.car === undefined? null : tile.car.status.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}
                fontSize={18}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
        </>
    );
}

export default DebugTile;

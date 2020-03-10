import React from "react";
import { Rect } from "react-konva";

function RoadTile({ row, col, gridCellSize, }) {
    return (
        <Rect
            x={col * gridCellSize.width}
            y={row * gridCellSize.height}
            width={gridCellSize.width}
            height={gridCellSize.height}
            fill={"rgb(240, 240, 240)"}
            stroke={"black"}
            strokeWidth={0.5}
        />
    );
}

export default RoadTile;

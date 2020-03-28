import React from "react";
import { Rect } from "react-konva";

function RoadTile({ visualGridOffset, row, col, gridCellSize, }) {
    return (
        <Rect
            x={visualGridOffset.x + col * gridCellSize.width}
            y={visualGridOffset.y + row * gridCellSize.height}
            width={gridCellSize.width}
            height={gridCellSize.height}
            fill={"rgb(240, 240, 240)"}
            stroke={"black"}
            strokeWidth={0.5}
        />
    );
}

export default RoadTile;

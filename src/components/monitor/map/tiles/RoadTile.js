import React from "react";
import { Rect } from "react-konva";

function RoadTile({ visualGridOffset, row, col, gridCellSize, }) {
    return (
        <Rect
            x={visualGridOffset.x + col * gridCellSize.width}
            y={visualGridOffset.y + row * gridCellSize.height}
            width={gridCellSize.width + 0.7}
            height={gridCellSize.height + 0.7}
            fill={"rgb(235, 235, 235)"}
        />
    );
}

export default RoadTile;

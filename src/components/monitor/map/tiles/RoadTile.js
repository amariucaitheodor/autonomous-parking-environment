import React from "react";
import { Rect } from "react-konva";

function RoadTile({ row, col, gridCellSize, }) {
    return (
        <>
            <Rect
                x={col * gridCellSize.width}
                y={row * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fillRadialGradientStartPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientEndPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientStartRadius={gridCellSize.width > gridCellSize.height ? gridCellSize.height : gridCellSize.width}
                fillRadialGradientColorStops={[
                    0, "rgb(210, 210, 210)",
                    1, "rgb(255, 255, 255)"
                ]}
                stroke={"black"}
                strokeWidth={2}
            />
        </>
    );
}

export default RoadTile;

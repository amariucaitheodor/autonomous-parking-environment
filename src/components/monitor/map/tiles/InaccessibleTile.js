import React from "react";
import { Rect, Image } from "react-konva";

function InaccessibleTile({ parkingLotOffset, row, col, gridCellSize, blockedImage }) {
    return (
        <>
            <Rect
                x={parkingLotOffset.x + col * gridCellSize.width}
                y={parkingLotOffset.y + row * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fillRadialGradientStartPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientEndPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientStartRadius={gridCellSize.width > gridCellSize.height ? gridCellSize.height : gridCellSize.width}
                fillRadialGradientColorStops={[0, "rgb(161, 39, 39)", 1, "rgb(197, 56, 56)"]}
                stroke={"black"}
                strokeWidth={0.5}
            />
            <Image
                x={parkingLotOffset.x + col * gridCellSize.width}
                y={parkingLotOffset.y + row * gridCellSize.height + gridCellSize.height / 3.5}
                width={gridCellSize.width}
                height={gridCellSize.height / 2}
                image={blockedImage}
                shadowBlur={5}
            />
        </>
    );
}

export default InaccessibleTile;

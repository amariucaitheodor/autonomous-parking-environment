import React from "react";
import { Rect } from "react-konva";
import KonvaImage from '../../../KonvaImage';
import InaccessibleTileImage from '../../../../assets/monitor_icons/blocked-sign.png';

function InaccessibleTile({ visualGridOffset, row, col, gridCellSize }) {
    return (
        <>
            <Rect
                x={visualGridOffset.x + col * gridCellSize.width}
                y={visualGridOffset.y + row * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fillRadialGradientStartPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientEndPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientStartRadius={gridCellSize.width > gridCellSize.height ? gridCellSize.height : gridCellSize.width}
                fillRadialGradientColorStops={[0, "rgb(161, 39, 39)", 1, "rgb(197, 56, 56)"]}
            />
            <KonvaImage
                x={visualGridOffset.x + col * gridCellSize.width}
                y={visualGridOffset.y + row * gridCellSize.height + gridCellSize.height / 3.5}
                width={gridCellSize.width}
                height={gridCellSize.height / 2}
                src={InaccessibleTileImage}
                shadowBlur={5}
            />
        </>
    );
}

export default InaccessibleTile;

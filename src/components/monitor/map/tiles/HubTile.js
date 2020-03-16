import React from "react";
import { Rect } from "react-konva";
import { tileCarStatus } from '../../../Configuration';
import GridImage from '../../../../assets/monitor_icons_components/GridImage';
import HubImage from '../../../../assets/monitor_icons/hub.png';
import CarImage from '../../../../assets/monitor_icons/racecar.png';

function HubTile({ parkingLotOffset, row, col, configuration, gridCellSize }) {
    var occupied = false;
    var hubTileColor = [0, "rgb(14, 82, 165)", 1, "rgb(19, 115, 236)"]; // neutral, blue
    if (configuration[row][col].car !== undefined) {
        if (configuration[row][col].car.status === tileCarStatus.AWAITING_PARKING)
            hubTileColor = [0, "rgb(189, 130, 42)", 1, "rgb(210, 144, 45)"];
        occupied = true;
    }

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
                fillRadialGradientColorStops={hubTileColor}
                stroke={"black"}
                strokeWidth={0.5}
            />
            <GridImage
                x={parkingLotOffset.x + col * gridCellSize.width}
                y={parkingLotOffset.y + row * gridCellSize.height + gridCellSize.height / 4}
                width={gridCellSize.width}
                height={gridCellSize.height / 2}
                src={HubImage}
                shadowBlur={5}
            />
            <GridImage
                x={parkingLotOffset.x + col * gridCellSize.width}
                y={parkingLotOffset.y + row * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                src={CarImage}
                shadowBlur={5}
                visible={occupied}
            />
        </>
    );
}

export default HubTile;

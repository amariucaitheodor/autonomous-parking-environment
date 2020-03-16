import React from "react";
import { Rect, Image } from "react-konva";
import { tileCarStatus } from '../../../Configuration';

function ParkingLotTile({ parkingLotOffset, row, col, configuration, gridCellSize, parkingImage, carImage }) {
    var occupied = false;
    var parkingLotTileColor = [0, "rgba(63,145,60)", 1, "rgba(103,233,98)"]; // neutral, green
    if (configuration[row][col].car !== undefined) {
        if (configuration[row][col].car.status === tileCarStatus.AWAITING_DELIVERY)
            parkingLotTileColor = [0, "rgb(189, 130, 42)", 1, "rgb(210, 144, 45)"];
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
                fillRadialGradientColorStops={parkingLotTileColor}
                stroke={"black"}
                strokeWidth={0.5}
            />
            <Image
                x={parkingLotOffset.x + col * gridCellSize.width}
                y={parkingLotOffset.y + row * gridCellSize.height + gridCellSize.height / 3.5}
                width={gridCellSize.width}
                height={gridCellSize.height / 2}
                image={parkingImage}
                shadowBlur={5}
            />
            <Image
                x={parkingLotOffset.x + col * gridCellSize.width}
                y={parkingLotOffset.y + row * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                image={carImage}
                shadowBlur={5}
                visible={occupied}
            />
        </>
    );
}

export default ParkingLotTile;

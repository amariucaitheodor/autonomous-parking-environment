import React from "react";
import { Rect, Image } from "react-konva";

function ParkingLotTile({ row, col, cars, gridCellSize, parkingImage, carImage }) {

    var occupied = false;
    var hubColor = [0, "rgba(63,145,60)", 1, "rgba(103,233,98)"]; // neutral, green
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].location.row === row && cars[i].location.column === col) {
            if (cars[i].status === "AwaitingDelivery")
                hubColor = [0, "rgb(189, 130, 42)", 1, "rgb(210, 144, 45)"];
            occupied = true;
            break;
        }
    }

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
                fillRadialGradientColorStops={hubColor}
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={3}
            />
            <Image
                x={col * gridCellSize.width}
                y={row * gridCellSize.height + gridCellSize.height / 3.5}
                width={gridCellSize.width}
                height={gridCellSize.height / 2}
                image={parkingImage}
                shadowBlur={5}
            />
            <Image
                x={col * gridCellSize.width}
                y={row * gridCellSize.height}
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

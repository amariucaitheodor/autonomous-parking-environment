import React from "react";
import { Rect, Image } from "react-konva";

function ParkingLotTile({ parkingLot, spacesAvailable, gridCellSize, parkingImage, carImage }) {

    let occupied = !spacesAvailable.includes("R" + parkingLot.y + "C" + parkingLot.x);

    return (
        <>
            <Rect
                x={parkingLot.x * gridCellSize.width}
                y={parkingLot.y * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fillRadialGradientStartPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientEndPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientStartRadius={gridCellSize.width > gridCellSize.height ? gridCellSize.height : gridCellSize.width}
                fillRadialGradientColorStops={
                    spacesAvailable.includes("R" + parkingLot.y + "C" + parkingLot.x) ?
                        [0, "rgba(63,145,60)", 1, "rgba(103,233,98)"] :
                        [0, "rgba(141,38,38)", 1, "rgba(230,67,67)"]
                }
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={3}
            />
            <Image
                x={parkingLot.x * gridCellSize.width}
                y={parkingLot.y * gridCellSize.height + gridCellSize.height / 3.5}
                width={gridCellSize.width}
                height={gridCellSize.height / 2}
                image={parkingImage}
                shadowBlur={5}
            />
            <Image
                x={parkingLot.x * gridCellSize.width}
                y={parkingLot.y * gridCellSize.height}
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

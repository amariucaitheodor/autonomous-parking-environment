import React from "react";
import { Rect, Image } from "react-konva";

function HubTile({ mapTile, cars, gridCellSize, hubImage, carImage }) {

    var occupied = false;
    var hubColor = [0, "rgb(14, 82, 165)", 1, "rgb(19, 115, 236)"]; // neutral, blue
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].location.row === mapTile.row && cars[i].location.column === mapTile.column) {
            if (cars[i].status === "AwaitingParking")
                hubColor = [0, "rgb(189, 130, 42)", 1, "rgb(210, 144, 45)"];
            occupied = true;
            break;
        }
    }

    return (
        <>
            <Rect
                x={mapTile.column * gridCellSize.width}
                y={mapTile.row * gridCellSize.height}
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
                x={mapTile.column * gridCellSize.width}
                y={mapTile.row * gridCellSize.height + gridCellSize.height / 4}
                width={gridCellSize.width}
                height={gridCellSize.height / 2}
                image={hubImage}
                shadowBlur={5}
            />
            <Image
                x={mapTile.column * gridCellSize.width}
                y={mapTile.row * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                image={carImage}
                shadowBlur={5}
                visible={occupied}
            />
        </>
    );
}

export default HubTile;

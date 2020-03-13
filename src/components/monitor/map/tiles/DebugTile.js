import React from "react";
import { Rect, Text } from "react-konva";
import { tileType } from '../../../Configuration';

function DebugTile({ parkingLotOffset, configuration, tile, row, col, gridCellSize, debugName }) {
    var carStatus = "";
    var carLicensePlate = "";
    if (configuration[row][col].car !== undefined) {
        carLicensePlate = "License Plate: " + configuration[row][col].car.license;
        switch (configuration[row][col].car.status) {
            case "AwaitingParking":
                carStatus = "Status: Awaiting Parking";
                break;
            case "AwaitingDelivery":
                carStatus = "Status: Awaiting Delivery";
                break;
            case null:
                if (tile.type === tileType.PARKING)
                    carStatus = "Status: Idle";
                else if (tile.type === tileType.HUB)
                    carStatus = "Status: Awaiting Owner";
                break;
            default:
                break;
        }
    }

    // We pass parkingLotOffset to the tiles to eliminate nesting and thus be able to run in FastLayer
    return (
        <>
            <Rect
                x={parkingLotOffset.x + col * gridCellSize.width}
                y={parkingLotOffset.y + row * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fill={"rgba(255, 255, 255, 0.35)"}
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={2}
            />
            <Text
                x={parkingLotOffset.x + col * gridCellSize.width + gridCellSize.width / 15}
                y={parkingLotOffset.y + row * gridCellSize.height + gridCellSize.height / 12}
                text={`R${row}C${col}`}
                fontSize={20}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
            <Text
                x={parkingLotOffset.x + col * gridCellSize.width + gridCellSize.width / 16}
                y={parkingLotOffset.y + row * gridCellSize.height + gridCellSize.height / 3.5}
                text={`(${debugName})`}
                fontSize={18}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
            <Text
                x={parkingLotOffset.x + col * gridCellSize.width + gridCellSize.width / 15}
                y={parkingLotOffset.y + row * gridCellSize.height + gridCellSize.height / 1.25}
                text={carLicensePlate}
                fontSize={18}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
            <Text
                x={parkingLotOffset.x + col * gridCellSize.width + gridCellSize.width / 15}
                y={parkingLotOffset.y + row * gridCellSize.height + gridCellSize.height / 1.55}
                text={carStatus}
                fontSize={18}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
        </>
    );
}

export default DebugTile;

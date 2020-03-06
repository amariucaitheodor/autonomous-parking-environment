import React from "react";
import { Rect, Group, Text } from "react-konva";

function DebugTile({ configuration, tile, row, col, gridCellSize, debugName }) {

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
                if (tile === "parking")
                    carStatus = "Status: Idle";
                else if (tile === "hub")
                    carStatus = "Status: Awaiting Owner";
                break;
            default:
                break;
        }
    }

    // const color = 'rgba(220, 220, 220, 0.8)'
    // const statusButton = {
    //     position: 'absolute',
    //     background: color,
    //     top: mapTile.y * gridCellSize.height + gridCellSize.height * 1.1,
    //     left: mapTile.x * gridCellSize.width + gridCellSize.width / 13,
    //     width: gridCellSize.width * 0.95,
    //     height: gridCellSize.height / 4
    // }
    // const typeButton = {
    //     position: 'absolute',
    //     background: color,
    //     top: mapTile.y * gridCellSize.height + gridCellSize.height / 2,
    //     left: mapTile.x * gridCellSize.width + gridCellSize.width / 13,
    //     width: gridCellSize.width * 0.95,
    //     height: gridCellSize.height / 4
    // }

    // TODO: replace portal with rect
    // if (mapTile.type === "hub")
    //     portalButtonGroup = <Portal>
    //         <Button
    //             variant="light"
    //             style={typeButton}
    //         >
    //             {debugName}
    //         </Button>
    //         <Button
    //             variant="light"
    //             style={statusButton}
    //         >
    //             Available
    //         </Button>
    //     </Portal>;
    // else if (mapTile.type === "parking")
    //     portalButtonGroup = <Portal>
    //         <Button
    //             variant="light"
    //             style={typeButton}
    //         >
    //             {debugName}
    //         </Button>
    //         <Button
    //             variant="light"
    //             style={statusButton}
    //         >
    //             Available parking
    //         </Button>
    //     </Portal>;
    // else
    //     portalButtonGroup = <Portal>
    //         <Button
    //             variant="light"
    //             style={typeButton}
    //         >
    //             {debugName}
    //         </Button>
    //     </Portal>;

    return (
        <Group>
            <Rect
                x={col * gridCellSize.width}
                y={row * gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fill={"rgba(255, 255, 255, 0.35)"}
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={2}
            />
            {/* {portalButtonGroup} */}
            <Text
                x={col * gridCellSize.width + gridCellSize.width / 15}
                y={row * gridCellSize.height + gridCellSize.height / 12}
                text={"R" + row + "C" + col + " (" + debugName + ")"}
                fontSize={20}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
            <Text
                x={col * gridCellSize.width + gridCellSize.width / 15}
                y={row * gridCellSize.height + gridCellSize.height / 1.25}
                text={carLicensePlate}
                fontSize={20}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
            <Text
                x={col * gridCellSize.width + gridCellSize.width / 15}
                y={row * gridCellSize.height + gridCellSize.height / 1.55}
                text={carStatus}
                fontSize={20}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fontStyle={"bold"}
            />
        </Group>
    );
}

export default DebugTile;

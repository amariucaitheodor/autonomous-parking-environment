import React from "react";
import PropTypes from 'prop-types';
import { Rect, Text, Group, Image } from "react-konva";
import parkingLotLayout from "../assets/planner/initial-map.json";
import useImage from 'use-image';
const parkingURL = require('../assets/parking-sign.svg');
const hubURL = require('../assets/hub.svg');

function Map({ spacesAvailable, gridCellSize, offset, debugMode, carImage }) {
    const [parkingImage] = useImage(parkingURL);
    const [hubImage] = useImage(hubURL);

    return (parkingLotLayout.map((parkingLot, index) => {
        let lotRender = null;
        let debugName = null;
        let hasStatus = false;

        switch (parkingLot.type) {
            case "parking":
                lotRender = <>
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
                    {!spacesAvailable.includes("R" + parkingLot.y + "C" + parkingLot.x) ?
                        <Image
                            x={parkingLot.x * gridCellSize.width}
                            y={parkingLot.y * gridCellSize.height}
                            width={gridCellSize.width}
                            height={gridCellSize.height}
                            image={carImage}
                            shadowBlur={5}
                        /> :
                        null
                    }
                </>
                debugName = "Parking space";
                hasStatus = true;
                break;
            case "hub":
                lotRender = <>
                    <Rect
                        x={parkingLot.x * gridCellSize.width}
                        y={parkingLot.y * gridCellSize.height}
                        width={gridCellSize.width}
                        height={gridCellSize.height}
                        fillRadialGradientStartPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                        fillRadialGradientEndPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                        fillRadialGradientStartRadius={gridCellSize.width > gridCellSize.height ? gridCellSize.height : gridCellSize.width}
                        fillRadialGradientColorStops={[0, "rgb(14, 82, 165)", 1, "rgb(19, 115, 236)"]}
                        shadowBlur={5}
                        stroke={"black"}
                        strokeWidth={3}
                    />
                    <Image
                        x={parkingLot.x * gridCellSize.width}
                        y={parkingLot.y * gridCellSize.height + gridCellSize.height / 4}
                        width={gridCellSize.width}
                        height={gridCellSize.height / 2}
                        image={hubImage}
                        shadowBlur={5}
                    />
                    {!spacesAvailable.includes("R" + parkingLot.y + "C" + parkingLot.x) ?
                        <Image
                            x={parkingLot.x * gridCellSize.width}
                            y={parkingLot.y * gridCellSize.height}
                            width={gridCellSize.width}
                            height={gridCellSize.height}
                            image={carImage}
                            shadowBlur={5}
                        /> :
                        null
                    }
                </>
                debugName = "Hub";
                hasStatus = true;
                break;
            case "road":
                debugName = "Road";
                break;
            case "blocked":
                debugName = "Blocked space";
                break;
            default:
                break;
        }

        return (
            <Group
                key={index}
                x={offset.x}
                y={offset.y}>
                {lotRender}
                {debugMode ?
                    <Group>
                        <Rect
                            x={parkingLot.x * gridCellSize.width}
                            y={parkingLot.y * gridCellSize.height}
                            width={gridCellSize.width}
                            height={gridCellSize.height}
                            fill={"rgba(255, 255, 255, 0.3)"}
                            shadowBlur={5}
                            stroke={"black"}
                            strokeWidth={3}
                        />
                        <Text
                            x={parkingLot.x * gridCellSize.width + gridCellSize.width / 15}
                            y={parkingLot.y * gridCellSize.height + gridCellSize.height / 12}
                            text={"R" + parkingLot.y + "C" + parkingLot.x + " (" + debugName + ")"}
                            fontSize={20}
                        />
                        <Text
                            x={parkingLot.x * gridCellSize.width + gridCellSize.width / 15}
                            y={parkingLot.y * gridCellSize.height + gridCellSize.height / 1.25}
                            text={hasStatus ?
                                "Status: " +
                                (parkingLot.type === "hub" ?
                                    (spacesAvailable.includes("R" + parkingLot.y + "C" + parkingLot.x) ?
                                        "Available" : "Awaiting Parking") :
                                    (parkingLot.type === "parking" ?
                                        (spacesAvailable.includes("R" + parkingLot.y + "C" + parkingLot.x) ?
                                            "Available" : "Occupied") :
                                        null)) :
                                null
                            }
                            fontSize={20}
                        />
                    </Group> :
                    null
                }
            </Group>
        );
    }));
}

Map.propTypes = {
    spacesAvailable: PropTypes.array.isRequired,
    gridCellSize: PropTypes.object.isRequired,
    debugMode: PropTypes.bool.isRequired,
    offset: PropTypes.object.isRequired
};

export default Map;

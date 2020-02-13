import React from "react";
import PropTypes from 'prop-types';
import { Rect, Text, Group, Image } from "react-konva";
import parkingLotLayout from "../assets/planner-logic/map.json";
import useImage from 'use-image';
const carURL = require('../assets/car.svg');

function Map({ spacesAvailable, debugGridCellSize, offset, debugMode }) {
    const [carImage] = useImage(carURL);

    return (parkingLotLayout.map((parkingLot, index) => {
        let lotRender = null;

        switch (parkingLot.type) {
            case "parking":
                lotRender = <Group
                    key={index}>
                    <Rect
                        x={offset.x + parkingLot.x * debugGridCellSize.width}
                        y={offset.y + parkingLot.y * debugGridCellSize.height}
                        width={debugGridCellSize.width}
                        height={debugGridCellSize.height}
                        fillRadialGradientStartPoint={{ x: debugGridCellSize.width / 2, y: debugGridCellSize.height / 2 }}
                        fillRadialGradientEndPoint={{ x: debugGridCellSize.width / 2, y: debugGridCellSize.height / 2 }}
                        fillRadialGradientStartRadius={debugGridCellSize.width > debugGridCellSize.height ? debugGridCellSize.height : debugGridCellSize.width}
                        fillRadialGradientColorStops={
                            spacesAvailable.includes("R" + parkingLot.y + "C" + parkingLot.x) ?
                                [0, "rgba(63,145,60)", 1, "rgba(103,233,98)"] :
                                [0, "rgba(141,38,38)", 1, "rgba(230,67,67)"]
                        }
                        shadowBlur={5}
                        stroke={"black"}
                        strokeWidth={3}
                    />
                    {!spacesAvailable.includes("R" + parkingLot.y + "C" + parkingLot.x) ?
                        <Image
                            x={offset.x + parkingLot.x * debugGridCellSize.width}
                            y={offset.y + parkingLot.y * debugGridCellSize.height - 65}
                            scale={{ x: 0.5, y: 0.5 }}
                            image={carImage}
                            shadowBlur={5}
                        /> :
                        null
                    }
                </Group>
                break;
            case "hub":
                lotRender = <>
                    <Rect
                        x={offset.x + parkingLot.x * debugGridCellSize.width}
                        y={offset.y + parkingLot.y * debugGridCellSize.height}
                        width={debugGridCellSize.width}
                        height={debugGridCellSize.height}
                        fillRadialGradientStartPoint={{ x: debugGridCellSize.width / 2, y: debugGridCellSize.height / 2 }}
                        fillRadialGradientEndPoint={{ x: debugGridCellSize.width / 2, y: debugGridCellSize.height / 2 }}
                        fillRadialGradientStartRadius={debugGridCellSize.width > debugGridCellSize.height ? debugGridCellSize.height : debugGridCellSize.width}
                        fillRadialGradientColorStops={[0, "rgb(14, 82, 165)", 1, "rgb(19, 115, 236)"]}
                        shadowBlur={5}
                        stroke={"black"}
                        strokeWidth={3}
                    />
                    {!spacesAvailable.includes("R" + parkingLot.y + "C" + parkingLot.x) ?
                        <Image
                            x={offset.x + parkingLot.x * debugGridCellSize.width}
                            y={offset.y + parkingLot.y * debugGridCellSize.height - 65}
                            scale={{ x: 0.5, y: 0.5 }}
                            image={carImage}
                            shadowBlur={5}
                        /> :
                        null
                    }
                </>
                break;
            default:
                break;
        }

        return (
            <Group key={index}>
                {lotRender}
                {debugMode ?
                    <Group>
                        <Rect
                            x={offset.x + parkingLot.x * debugGridCellSize.width}
                            y={offset.y + parkingLot.y * debugGridCellSize.height}
                            width={debugGridCellSize.width}
                            height={debugGridCellSize.height}
                            fill={"rgba(255, 255, 255, 0.2)"}
                            shadowBlur={5}
                            stroke={"black"}
                            strokeWidth={3}
                        />
                        <Text
                            x={offset.x + parkingLot.x * debugGridCellSize.width + debugGridCellSize.width / 10}
                            y={offset.y + parkingLot.y * debugGridCellSize.height + debugGridCellSize.height / 5}
                            text={"R" + parkingLot.y + "C" + parkingLot.x}
                            fontSize={20}
                        />
                        <Text
                            x={offset.x + parkingLot.x * debugGridCellSize.width + debugGridCellSize.width / 10}
                            y={offset.y + parkingLot.y * debugGridCellSize.height + debugGridCellSize.height / 2 + 30}
                            text={parkingLot.type === "hub" ?
                                (spacesAvailable.includes("R" + parkingLot.y + "C" + parkingLot.x) ?
                                    "AVAILABLE" : "AWAITING PARKING") :
                                (parkingLot.type === "parking" ?
                                    (spacesAvailable.includes("R" + parkingLot.y + "C" + parkingLot.x) ?
                                        "AVAILABLE" : "OCCUPIED") :
                                    null)
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
    debugGridCellSize: PropTypes.object.isRequired,
    debugMode: PropTypes.bool.isRequired,
    offset: PropTypes.object.isRequired
};

export default Map;

import React from "react";
import { Group } from "react-konva";
import useImage from 'use-image';
import ParkingLotTile from "./ParkingLotTile.js";
import HubTile from "./HubTile.js";
import DebugTile from "./DebugTile.js";
const parkingURL = require('../../../assets/images/parking-sign.svg');
const hubURL = require('../../../assets/images/hub.svg');

function Map({ map, cars, gridCellSize, offset, debugMode, carImage }) {
    const [parkingImage] = useImage(parkingURL);
    const [hubImage] = useImage(hubURL);

    return (map.map((mapTile, index) => {
        let tile = null;
        let debugName = null;

        switch (mapTile.type) {
            case "parking":
                tile = <ParkingLotTile
                    mapTile={mapTile}
                    cars={cars}
                    gridCellSize={gridCellSize}
                    parkingImage={parkingImage}
                    carImage={carImage}
                />
                debugName = "Parking space";
                break;
            case "hub":
                tile = <HubTile
                    mapTile={mapTile}
                    cars={cars}
                    gridCellSize={gridCellSize}
                    hubImage={hubImage}
                    carImage={carImage}
                />
                debugName = "Hub";
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
                {tile}
                {debugMode ?
                    <DebugTile
                        mapTile={mapTile}
                        cars={cars}
                        gridCellSize={gridCellSize}
                        debugName={debugName}
                    />
                    :
                    null
                }
            </Group >
        );
    }));
}

export default Map;
